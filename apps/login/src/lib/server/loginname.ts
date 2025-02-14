"use server";

import { create } from "@zitadel/client";
import { ChecksSchema } from "@zitadel/proto/zitadel/session/v2/session_service_pb";
import { AuthenticationMethodType } from "@zitadel/proto/zitadel/user/v2/user_service_pb";
import { headers } from "next/headers";
import { idpTypeToIdentityProviderType, idpTypeToSlug } from "../idp";

import { PasskeysType } from "@zitadel/proto/zitadel/settings/v2/login_settings_pb";
import { UserState } from "@zitadel/proto/zitadel/user/v2/user_pb";
import { getServiceUrlFromHeaders } from "../service";
import { checkInvite } from "../verify-helper";
import {
  getActiveIdentityProviders,
  getIDPByID,
  getLoginSettings,
  getOrgsByDomain,
  listAuthenticationMethodTypes,
  listIDPLinks,
  searchUsers,
  SearchUsersCommand,
  startIdentityProviderFlow,
} from "../zitadel";
import { createSessionAndUpdateCookie } from "./cookie";

export type SendLoginnameCommand = {
  loginName: string;
  requestId?: string;
  organization?: string;
  suffix?: string;
};

const ORG_SUFFIX_REGEX = /(?<=@)(.+)/;

export async function sendLoginname(command: SendLoginnameCommand) {
  const _headers = await headers();
  const { serviceUrl } = getServiceUrlFromHeaders(_headers);
  const host = _headers.get("host");

  if (!host) {
    throw new Error("Could not get domain");
  }

  const loginSettingsByContext = await getLoginSettings({
    serviceUrl,

    organization: command.organization,
  });

  if (!loginSettingsByContext) {
    return { error: "Could not get login settings" };
  }

  let searchUsersRequest: SearchUsersCommand = {
    serviceUrl,

    searchValue: command.loginName,
    organizationId: command.organization,
    loginSettings: loginSettingsByContext,
    suffix: command.suffix,
  };

  const searchResult = await searchUsers(searchUsersRequest);

  if ("error" in searchResult && searchResult.error) {
    return searchResult;
  }

  if (!("result" in searchResult)) {
    return { error: "Could not search users" };
  }

  const { result: potentialUsers } = searchResult;

  const redirectUserToSingleIDPIfAvailable = async () => {
    const identityProviders = await getActiveIdentityProviders({
      serviceUrl,

      orgId: command.organization,
    }).then((resp) => {
      return resp.identityProviders;
    });

    if (identityProviders.length === 1) {
      const _headers = await headers();
      const { serviceUrl } = getServiceUrlFromHeaders(_headers);
      const host = _headers.get("host");

      if (!host) {
        return { error: "Could not get host" };
      }

      const identityProviderType = identityProviders[0].type;

      const provider = idpTypeToSlug(identityProviderType);

      const params = new URLSearchParams();

      if (command.requestId) {
        params.set("requestId", command.requestId);
      }

      if (command.organization) {
        params.set("organization", command.organization);
      }

      const resp = await startIdentityProviderFlow({
        serviceUrl,

        idpId: identityProviders[0].id,
        urls: {
          successUrl:
            `${host.includes("localhost") ? "http://" : "https://"}${host}/idp/${provider}/success?` +
            new URLSearchParams(params),
          failureUrl:
            `${host.includes("localhost") ? "http://" : "https://"}${host}/idp/${provider}/failure?` +
            new URLSearchParams(params),
        },
      });

      if (resp?.nextStep.case === "authUrl") {
        return { redirect: resp.nextStep.value };
      }
    }
  };

  const redirectUserToIDP = async (userId: string) => {
    const identityProviders = await listIDPLinks({
      serviceUrl,

      userId,
    }).then((resp) => {
      return resp.result;
    });

    if (identityProviders.length === 1) {
      const _headers = await headers();
      const { serviceUrl } = getServiceUrlFromHeaders(_headers);
      const host = _headers.get("host");

      if (!host) {
        return { error: "Could not get host" };
      }

      const identityProviderId = identityProviders[0].idpId;

      const idp = await getIDPByID({
        serviceUrl,

        id: identityProviderId,
      });

      const idpType = idp?.type;

      if (!idp || !idpType) {
        throw new Error("Could not find identity provider");
      }

      const identityProviderType = idpTypeToIdentityProviderType(idpType);
      const provider = idpTypeToSlug(identityProviderType);

      const params = new URLSearchParams({ userId });

      if (command.requestId) {
        params.set("requestId", command.requestId);
      }

      if (command.organization) {
        params.set("organization", command.organization);
      }

      const resp = await startIdentityProviderFlow({
        serviceUrl,

        idpId: idp.id,
        urls: {
          successUrl:
            `${host.includes("localhost") ? "http://" : "https://"}${host}/idp/${provider}/success?` +
            new URLSearchParams(params),
          failureUrl:
            `${host.includes("localhost") ? "http://" : "https://"}${host}/idp/${provider}/failure?` +
            new URLSearchParams(params),
        },
      });

      if (resp?.nextStep.case === "authUrl") {
        return { redirect: resp.nextStep.value };
      }
    }
  };

  if (potentialUsers.length > 1) {
    return { error: "More than one user found. Provide a unique identifier." };
  } else if (potentialUsers.length == 1 && potentialUsers[0].userId) {
    const user = potentialUsers[0];
    const userId = potentialUsers[0].userId;

    const userLoginSettings = await getLoginSettings({
      serviceUrl,

      organization: user.details?.resourceOwner,
    });

    // compare with the concatenated suffix when set
    const concatLoginname = command.suffix
      ? `${command.loginName}@${command.suffix}`
      : command.loginName;

    const humanUser =
      potentialUsers[0].type.case === "human"
        ? potentialUsers[0].type.value
        : undefined;

    // recheck login settings after user discovery, as the search might have been done without org scope
    if (
      userLoginSettings?.disableLoginWithEmail &&
      userLoginSettings?.disableLoginWithPhone
    ) {
      if (user.preferredLoginName !== concatLoginname) {
        return { error: "User not found in the system!" };
      }
    } else if (userLoginSettings?.disableLoginWithEmail) {
      if (
        user.preferredLoginName !== concatLoginname ||
        humanUser?.phone?.phone !== command.loginName
      ) {
        return { error: "User not found in the system!" };
      }
    } else if (userLoginSettings?.disableLoginWithPhone) {
      if (
        user.preferredLoginName !== concatLoginname ||
        humanUser?.email?.email !== command.loginName
      ) {
        return { error: "User not found in the system!" };
      }
    }

    const checks = create(ChecksSchema, {
      user: { search: { case: "userId", value: userId } },
    });

    const session = await createSessionAndUpdateCookie(
      checks,
      undefined,
      command.requestId,
    );

    if (!session.factors?.user?.id) {
      return { error: "Could not create session for user" };
    }

    // TODO: check if handling of userstate INITIAL is needed
    if (user.state === UserState.INITIAL) {
      return { error: "Initial User not supported" };
    }

    const methods = await listAuthenticationMethodTypes({
      serviceUrl,

      userId: session.factors?.user?.id,
    });

    // this can be expected to be an invite as users created in console have a password set.
    if (!methods.authMethodTypes || !methods.authMethodTypes.length) {
      // redirect to /verify invite if no auth method is set and email is not verified
      const inviteCheck = checkInvite(
        session,
        humanUser,
        session.factors.user.organizationId,
        command.requestId,
      );

      if (inviteCheck?.redirect) {
        return inviteCheck;
      }

      const paramsAuthenticatorSetup = new URLSearchParams({
        loginName: session.factors?.user?.loginName,
        userId: session.factors?.user?.id, // verify needs user id
      });

      if (command.organization || session.factors?.user?.organizationId) {
        paramsAuthenticatorSetup.append(
          "organization",
          command.organization ?? session.factors?.user?.organizationId,
        );
      }

      if (command.requestId) {
        paramsAuthenticatorSetup.append("requestId", command.requestId);
      }

      return { redirect: "/authenticator/set?" + paramsAuthenticatorSetup };
    }

    if (methods.authMethodTypes.length == 1) {
      const method = methods.authMethodTypes[0];
      switch (method) {
        case AuthenticationMethodType.PASSWORD: // user has only password as auth method
          if (!userLoginSettings?.allowUsernamePassword) {
            return {
              error:
                "Username Password not allowed! Contact your administrator for more information.",
            };
          }

          const paramsPassword: any = {
            loginName: session.factors?.user?.loginName,
          };

          // TODO: does this have to be checked in loginSettings.allowDomainDiscovery

          if (command.organization || session.factors?.user?.organizationId) {
            paramsPassword.organization =
              command.organization ?? session.factors?.user?.organizationId;
          }

          if (command.requestId) {
            paramsPassword.requestId = command.requestId;
          }

          return {
            redirect: "/password?" + new URLSearchParams(paramsPassword),
          };

        case AuthenticationMethodType.PASSKEY: // AuthenticationMethodType.AUTHENTICATION_METHOD_TYPE_PASSKEY
          if (userLoginSettings?.passkeysType === PasskeysType.NOT_ALLOWED) {
            return {
              error:
                "Passkeys not allowed! Contact your administrator for more information.",
            };
          }

          const paramsPasskey: any = { loginName: command.loginName };
          if (command.requestId) {
            paramsPasskey.requestId = command.requestId;
          }

          if (command.organization || session.factors?.user?.organizationId) {
            paramsPasskey.organization =
              command.organization ?? session.factors?.user?.organizationId;
          }

          return { redirect: "/passkey?" + new URLSearchParams(paramsPasskey) };
      }
    } else {
      // prefer passkey in favor of other methods
      if (methods.authMethodTypes.includes(AuthenticationMethodType.PASSKEY)) {
        const passkeyParams: any = {
          loginName: command.loginName,
          altPassword: `${methods.authMethodTypes.includes(1)}`, // show alternative password option
        };

        if (command.requestId) {
          passkeyParams.requestId = command.requestId;
        }

        if (command.organization || session.factors?.user?.organizationId) {
          passkeyParams.organization =
            command.organization ?? session.factors?.user?.organizationId;
        }

        return { redirect: "/passkey?" + new URLSearchParams(passkeyParams) };
      } else if (
        methods.authMethodTypes.includes(AuthenticationMethodType.IDP)
      ) {
        return redirectUserToIDP(userId);
      } else if (
        methods.authMethodTypes.includes(AuthenticationMethodType.PASSWORD)
      ) {
        // user has no passkey setup and login settings allow passkeys
        const paramsPasswordDefault: any = { loginName: command.loginName };

        if (command.requestId) {
          paramsPasswordDefault.requestId = command.requestId;
        }

        if (command.organization || session.factors?.user?.organizationId) {
          paramsPasswordDefault.organization =
            command.organization ?? session.factors?.user?.organizationId;
        }

        return {
          redirect: "/password?" + new URLSearchParams(paramsPasswordDefault),
        };
      }
    }
  }

  // user not found, check if register is enabled on instance / organization context
  if (
    loginSettingsByContext?.allowRegister &&
    !loginSettingsByContext?.allowUsernamePassword
  ) {
    const resp = await redirectUserToSingleIDPIfAvailable();
    if (resp) {
      return resp;
    }
    return { error: "User not found in the system" };
  } else if (
    loginSettingsByContext?.allowRegister &&
    loginSettingsByContext?.allowUsernamePassword
  ) {
    let orgToRegisterOn: string | undefined = command.organization;

    if (
      !loginSettingsByContext?.ignoreUnknownUsernames &&
      !orgToRegisterOn &&
      command.loginName &&
      ORG_SUFFIX_REGEX.test(command.loginName)
    ) {
      const matched = ORG_SUFFIX_REGEX.exec(command.loginName);
      const suffix = matched?.[1] ?? "";

      // this just returns orgs where the suffix is set as primary domain
      const orgs = await getOrgsByDomain({
        serviceUrl,

        domain: suffix,
      });
      const orgToCheckForDiscovery =
        orgs.result && orgs.result.length === 1 ? orgs.result[0].id : undefined;

      const orgLoginSettings = await getLoginSettings({
        serviceUrl,

        organization: orgToCheckForDiscovery,
      });
      if (orgLoginSettings?.allowDomainDiscovery) {
        orgToRegisterOn = orgToCheckForDiscovery;
      }
    }

    // do not register user if ignoreUnknownUsernames is set
    if (orgToRegisterOn && !loginSettingsByContext?.ignoreUnknownUsernames) {
      const params = new URLSearchParams({ organization: orgToRegisterOn });

      if (command.requestId) {
        params.set("requestId", command.requestId);
      }

      if (command.loginName) {
        params.set("email", command.loginName);
      }

      return { redirect: "/register?" + params };
    }
  }

  if (loginSettingsByContext?.ignoreUnknownUsernames) {
    const paramsPasswordDefault = new URLSearchParams({
      loginName: command.loginName,
    });

    if (command.requestId) {
      paramsPasswordDefault.append("requestId", command.requestId);
    }

    if (command.organization) {
      paramsPasswordDefault.append("organization", command.organization);
    }

    return { redirect: "/password?" + paramsPasswordDefault };
  }

  // fallbackToPassword

  return { error: "User not found in the system" };
}
