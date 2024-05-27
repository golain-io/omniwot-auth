// @generated by protoc-gen-connect-es v1.4.0
// @generated from file zitadel/user/v3alpha/user_service.proto (package zitadel.user.v3alpha, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import { AddIDPAuthenticatorRequest, AddIDPAuthenticatorResponse, AddOTPEmailAuthenticatorRequest, AddOTPEmailAuthenticatorResponse, AddOTPSMSAuthenticatorRequest, AddOTPSMSAuthenticatorResponse, AddUsernameRequest, AddUsernameResponse, CreateUserRequest, CreateUserResponse, CreateWebAuthNRegistrationLinkRequest, CreateWebAuthNRegistrationLinkResponse, DeactivateUserRequest, DeactivateUserResponse, DeleteUserRequest, DeleteUserResponse, GetUserByIDRequest, GetUserByIDResponse, ListUsersRequest, ListUsersResponse, LockUserRequest, LockUserResponse, ReactivateUserRequest, ReactivateUserResponse, RemoveIDPAuthenticatorRequest, RemoveIDPAuthenticatorResponse, RemoveOTPEmailAuthenticatorRequest, RemoveOTPEmailAuthenticatorResponse, RemoveOTPSMSAuthenticatorRequest, RemoveOTPSMSAuthenticatorResponse, RemoveTOTPAuthenticatorRequest, RemoveTOTPAuthenticatorResponse, RemoveUsernameRequest, RemoveUsernameResponse, RemoveWebAuthNAuthenticatorRequest, RemoveWebAuthNAuthenticatorResponse, RequestPasswordResetRequest, RequestPasswordResetResponse, ResendContactEmailCodeRequest, ResendContactEmailCodeResponse, ResendContactPhoneCodeRequest, ResendContactPhoneCodeResponse, RetrieveIdentityProviderIntentRequest, RetrieveIdentityProviderIntentResponse, SetContactEmailRequest, SetContactEmailResponse, SetContactPhoneRequest, SetContactPhoneResponse, SetPasswordRequest, SetPasswordResponse, StartIdentityProviderIntentRequest, StartIdentityProviderIntentResponse, StartTOTPRegistrationRequest, StartTOTPRegistrationResponse, StartWebAuthNRegistrationRequest, StartWebAuthNRegistrationResponse, UnlockUserRequest, UnlockUserResponse, UpdateUserRequest, UpdateUserResponse, VerifyContactEmailRequest, VerifyContactEmailResponse, VerifyContactPhoneRequest, VerifyContactPhoneResponse, VerifyOTPEmailRegistrationRequest, VerifyOTPEmailRegistrationResponse, VerifyOTPSMSRegistrationRequest, VerifyOTPSMSRegistrationResponse, VerifyTOTPRegistrationRequest, VerifyTOTPRegistrationResponse, VerifyWebAuthNRegistrationRequest, VerifyWebAuthNRegistrationResponse } from "./user_service_pb.js";
import { MethodKind } from "@bufbuild/protobuf";

/**
 * @generated from service zitadel.user.v3alpha.UserService
 */
export const UserService = {
  typeName: "zitadel.user.v3alpha.UserService",
  methods: {
    /**
     * List users
     *
     * List all matching users. By default, we will return all users of your instance.
     * Make sure to include a limit and sorting for pagination.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.ListUsers
     */
    listUsers: {
      name: "ListUsers",
      I: ListUsersRequest,
      O: ListUsersResponse,
      kind: MethodKind.Unary,
    },
    /**
     * User by ID
     *
     * Returns the user identified by the requested ID.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.GetUserByID
     */
    getUserByID: {
      name: "GetUserByID",
      I: GetUserByIDRequest,
      O: GetUserByIDResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Create a user
     *
     * Create a new user with an optional data schema.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.CreateUser
     */
    createUser: {
      name: "CreateUser",
      I: CreateUserRequest,
      O: CreateUserResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Update a user
     *
     * Update an existing user with data based on a user schema.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.UpdateUser
     */
    updateUser: {
      name: "UpdateUser",
      I: UpdateUserRequest,
      O: UpdateUserResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Deactivate a user
     *
     * Deactivate an existing user and change the state 'deactivated'.
     * The user will not be able to log in anymore.
     * Use deactivate user when the user should not be able to use the account anymore,
     * but you still need access to the user data.
     *
     * The endpoint returns an error if the user is already in the state 'deactivated'.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.DeactivateUser
     */
    deactivateUser: {
      name: "DeactivateUser",
      I: DeactivateUserRequest,
      O: DeactivateUserResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Reactivate a user
     *
     * Reactivate a previously deactivated user and change the state to 'active'.
     * The user will be able to log in again.
     *
     * The endpoint returns an error if the user is not in the state 'deactivated'.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.ReactivateUser
     */
    reactivateUser: {
      name: "ReactivateUser",
      I: ReactivateUserRequest,
      O: ReactivateUserResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Lock a user
     *
     * Lock an existing user and change the state 'locked'.
     * The user will not be able to log in anymore.
     * Use lock user when the user should temporarily not be able to log in
     * because of an event that happened (wrong password, etc.)
     *
     * The endpoint returns an error if the user is already in the state 'locked'.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.LockUser
     */
    lockUser: {
      name: "LockUser",
      I: LockUserRequest,
      O: LockUserResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Unlock a user
     *
     * Unlock a previously locked user and change the state to 'active'.
     * The user will be able to log in again.
     *
     * The endpoint returns an error if the user is not in the state 'locked'.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.UnlockUser
     */
    unlockUser: {
      name: "UnlockUser",
      I: UnlockUserRequest,
      O: UnlockUserResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Delete a user
     *
     * Delete an existing user and change the state to 'deleted'.
     * The user will be able to log in anymore.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.DeleteUser
     */
    deleteUser: {
      name: "DeleteUser",
      I: DeleteUserRequest,
      O: DeleteUserResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Set contact email
     *
     * Add or update the contact email address of a user.
     * If the email is not passed as verified, a verification code will be generated,
     * which can be either returned or will be sent to the user by email.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.SetContactEmail
     */
    setContactEmail: {
      name: "SetContactEmail",
      I: SetContactEmailRequest,
      O: SetContactEmailResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Verify the contact email
     *
     * Verify the contact email with the provided code.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.VerifyContactEmail
     */
    verifyContactEmail: {
      name: "VerifyContactEmail",
      I: VerifyContactEmailRequest,
      O: VerifyContactEmailResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Resend the contact email code
     *
     * Resend the email with the verification code for the contact email address.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.ResendContactEmailCode
     */
    resendContactEmailCode: {
      name: "ResendContactEmailCode",
      I: ResendContactEmailCodeRequest,
      O: ResendContactEmailCodeResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Set contact phone
     *
     * Add or update the contact phone number of a user.
     * If the phone is not passed as verified, a verification code will be generated,
     * which can be either returned or will be sent to the user by SMS.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.SetContactPhone
     */
    setContactPhone: {
      name: "SetContactPhone",
      I: SetContactPhoneRequest,
      O: SetContactPhoneResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Verify the contact phone
     *
     * Verify the contact phone with the provided code.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.VerifyContactPhone
     */
    verifyContactPhone: {
      name: "VerifyContactPhone",
      I: VerifyContactPhoneRequest,
      O: VerifyContactPhoneResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Resend the contact phone code
     *
     * Resend the phone with the verification code for the contact phone number.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.ResendContactPhoneCode
     */
    resendContactPhoneCode: {
      name: "ResendContactPhoneCode",
      I: ResendContactPhoneCodeRequest,
      O: ResendContactPhoneCodeResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Add a username
     *
     * Add a new unique username to a user. The username will be used to identify the user on authentication.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.AddUsername
     */
    addUsername: {
      name: "AddUsername",
      I: AddUsernameRequest,
      O: AddUsernameResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Remove a username
     *
     * Remove an existing username of a user, so it cannot be used for authentication anymore.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.RemoveUsername
     */
    removeUsername: {
      name: "RemoveUsername",
      I: RemoveUsernameRequest,
      O: RemoveUsernameResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Set a password
     *
     * Add, update or reset a user's password with either a verification code or the current password.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.SetPassword
     */
    setPassword: {
      name: "SetPassword",
      I: SetPasswordRequest,
      O: SetPasswordResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Request password reset
     *
     * Request a code to be able to set a new password.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.RequestPasswordReset
     */
    requestPasswordReset: {
      name: "RequestPasswordReset",
      I: RequestPasswordResetRequest,
      O: RequestPasswordResetResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Start a WebAuthN registration
     *
     * Start the registration of a new WebAuthN device (e.g. Passkeys) for a user.
     * As a response the public key credential creation options are returned,
     * which are used to verify the device.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.StartWebAuthNRegistration
     */
    startWebAuthNRegistration: {
      name: "StartWebAuthNRegistration",
      I: StartWebAuthNRegistrationRequest,
      O: StartWebAuthNRegistrationResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Verify a WebAuthN registration
     *
     * Verify the WebAuthN registration started by StartWebAuthNRegistration with the public key credential.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.VerifyWebAuthNRegistration
     */
    verifyWebAuthNRegistration: {
      name: "VerifyWebAuthNRegistration",
      I: VerifyWebAuthNRegistrationRequest,
      O: VerifyWebAuthNRegistrationResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Create a WebAuthN registration link
     *
     * Create a link, which includes a code, that can either be returned or directly sent to the user.
     * The code will allow the user to start a new WebAuthN registration.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.CreateWebAuthNRegistrationLink
     */
    createWebAuthNRegistrationLink: {
      name: "CreateWebAuthNRegistrationLink",
      I: CreateWebAuthNRegistrationLinkRequest,
      O: CreateWebAuthNRegistrationLinkResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Remove a WebAuthN authenticator
     *
     * Remove an existing WebAuthN authenticator from a user, so it cannot be used for authentication anymore.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.RemoveWebAuthNAuthenticator
     */
    removeWebAuthNAuthenticator: {
      name: "RemoveWebAuthNAuthenticator",
      I: RemoveWebAuthNAuthenticatorRequest,
      O: RemoveWebAuthNAuthenticatorResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Start a TOTP registration
     *
     * Start the registration of a new time-based one-time-password (TOTP) generator for a user.
     * As a response a secret is returned, which is used to initialize a TOTP app or device.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.StartTOTPRegistration
     */
    startTOTPRegistration: {
      name: "StartTOTPRegistration",
      I: StartTOTPRegistrationRequest,
      O: StartTOTPRegistrationResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Verify a TOTP registration
     *
     * Verify the time-based one-time-password (TOTP) registration with the generated code.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.VerifyTOTPRegistration
     */
    verifyTOTPRegistration: {
      name: "VerifyTOTPRegistration",
      I: VerifyTOTPRegistrationRequest,
      O: VerifyTOTPRegistrationResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Remove a TOTP authenticator
     *
     * Remove an existing time-based one-time-password (TOTP) authenticator from a user, so it cannot be used for authentication anymore.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.RemoveTOTPAuthenticator
     */
    removeTOTPAuthenticator: {
      name: "RemoveTOTPAuthenticator",
      I: RemoveTOTPAuthenticatorRequest,
      O: RemoveTOTPAuthenticatorResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Add a OTP SMS authenticator
     *
     * Add a new one-time-password (OTP) SMS authenticator to a user.
     * If the phone is not passed as verified, a verification code will be generated,
     * which can be either returned or will be sent to the user by SMS.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.AddOTPSMSAuthenticator
     */
    addOTPSMSAuthenticator: {
      name: "AddOTPSMSAuthenticator",
      I: AddOTPSMSAuthenticatorRequest,
      O: AddOTPSMSAuthenticatorResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Verify OTP SMS registration
     *
     * Verify the OTP SMS registration with the provided code.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.VerifyOTPSMSRegistration
     */
    verifyOTPSMSRegistration: {
      name: "VerifyOTPSMSRegistration",
      I: VerifyOTPSMSRegistrationRequest,
      O: VerifyOTPSMSRegistrationResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Remove a OTP SMS authenticator
     *
     * Remove an existing one-time-password (OTP) SMS authenticator from a user, so it cannot be used for authentication anymore.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.RemoveOTPSMSAuthenticator
     */
    removeOTPSMSAuthenticator: {
      name: "RemoveOTPSMSAuthenticator",
      I: RemoveOTPSMSAuthenticatorRequest,
      O: RemoveOTPSMSAuthenticatorResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Add a OTP Email authenticator
     *
     * Add a new one-time-password (OTP) Email authenticator to a user.
     * If the email is not passed as verified, a verification code will be generated,
     * which can be either returned or will be sent to the user by email.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.AddOTPEmailAuthenticator
     */
    addOTPEmailAuthenticator: {
      name: "AddOTPEmailAuthenticator",
      I: AddOTPEmailAuthenticatorRequest,
      O: AddOTPEmailAuthenticatorResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Verify OTP Email registration
     *
     * Verify the OTP Email registration with the provided code.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.VerifyOTPEmailRegistration
     */
    verifyOTPEmailRegistration: {
      name: "VerifyOTPEmailRegistration",
      I: VerifyOTPEmailRegistrationRequest,
      O: VerifyOTPEmailRegistrationResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Remove a OTP Email authenticator
     *
     * Remove an existing one-time-password (OTP) Email authenticator from a user, so it cannot be used for authentication anymore.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.RemoveOTPEmailAuthenticator
     */
    removeOTPEmailAuthenticator: {
      name: "RemoveOTPEmailAuthenticator",
      I: RemoveOTPEmailAuthenticatorRequest,
      O: RemoveOTPEmailAuthenticatorResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Start an IDP authentication intent
     *
     * Start a new authentication intent on configured identity provider (IDP) for external login, registration or linking.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.StartIdentityProviderIntent
     */
    startIdentityProviderIntent: {
      name: "StartIdentityProviderIntent",
      I: StartIdentityProviderIntentRequest,
      O: StartIdentityProviderIntentResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Retrieve the information of the IDP authentication intent
     *
     * Retrieve the information returned by the identity provider (IDP) for registration or updating an existing user with new information.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.RetrieveIdentityProviderIntent
     */
    retrieveIdentityProviderIntent: {
      name: "RetrieveIdentityProviderIntent",
      I: RetrieveIdentityProviderIntentRequest,
      O: RetrieveIdentityProviderIntentResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Add an IDP authenticator to a user
     *
     * Add a new identity provider (IDP) authenticator to an existing user.
     * This will allow the user to authenticate with the provided IDP.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.AddIDPAuthenticator
     */
    addIDPAuthenticator: {
      name: "AddIDPAuthenticator",
      I: AddIDPAuthenticatorRequest,
      O: AddIDPAuthenticatorResponse,
      kind: MethodKind.Unary,
    },
    /**
     * Remove an IDP authenticator
     *
     * Remove an existing identity provider (IDP) authenticator from a user, so it cannot be used for authentication anymore.
     *
     * @generated from rpc zitadel.user.v3alpha.UserService.RemoveIDPAuthenticator
     */
    removeIDPAuthenticator: {
      name: "RemoveIDPAuthenticator",
      I: RemoveIDPAuthenticatorRequest,
      O: RemoveIDPAuthenticatorResponse,
      kind: MethodKind.Unary,
    },
  }
};

