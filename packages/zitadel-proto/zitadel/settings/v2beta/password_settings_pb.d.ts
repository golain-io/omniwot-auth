// @generated by protoc-gen-es v1.9.0
// @generated from file zitadel/settings/v2beta/password_settings.proto (package zitadel.settings.v2beta, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type {
  BinaryReadOptions,
  FieldList,
  JsonReadOptions,
  JsonValue,
  PartialMessage,
  PlainMessage,
} from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import type { ResourceOwnerType } from "./settings_pb.js";

/**
 * @generated from message zitadel.settings.v2beta.PasswordComplexitySettings
 */
export declare class PasswordComplexitySettings extends Message<PasswordComplexitySettings> {
  /**
   * @generated from field: uint64 min_length = 1;
   */
  minLength: bigint;

  /**
   * @generated from field: bool requires_uppercase = 2;
   */
  requiresUppercase: boolean;

  /**
   * @generated from field: bool requires_lowercase = 3;
   */
  requiresLowercase: boolean;

  /**
   * @generated from field: bool requires_number = 4;
   */
  requiresNumber: boolean;

  /**
   * @generated from field: bool requires_symbol = 5;
   */
  requiresSymbol: boolean;

  /**
   * resource_owner_type returns if the settings is managed on the organization or on the instance
   *
   * @generated from field: zitadel.settings.v2beta.ResourceOwnerType resource_owner_type = 6;
   */
  resourceOwnerType: ResourceOwnerType;

  constructor(data?: PartialMessage<PasswordComplexitySettings>);

  static readonly runtime: typeof proto3;
  static readonly typeName =
    "zitadel.settings.v2beta.PasswordComplexitySettings";
  static readonly fields: FieldList;

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): PasswordComplexitySettings;

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): PasswordComplexitySettings;

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): PasswordComplexitySettings;

  static equals(
    a:
      | PasswordComplexitySettings
      | PlainMessage<PasswordComplexitySettings>
      | undefined,
    b:
      | PasswordComplexitySettings
      | PlainMessage<PasswordComplexitySettings>
      | undefined,
  ): boolean;
}
