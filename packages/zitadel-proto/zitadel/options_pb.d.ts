// @generated by protoc-gen-es v1.9.0
// @generated from file zitadel/options.proto (package zitadel.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type {
  BinaryReadOptions,
  Extension,
  FieldList,
  JsonReadOptions,
  JsonValue,
  MethodOptions,
  PartialMessage,
  PlainMessage,
} from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";

/**
 * @generated from message zitadel.v1.AuthOption
 */
export declare class AuthOption extends Message<AuthOption> {
  /**
   * @generated from field: string permission = 1;
   */
  permission: string;

  /**
   * @generated from field: string check_field_name = 2;
   */
  checkFieldName: string;

  constructor(data?: PartialMessage<AuthOption>);

  static readonly runtime: typeof proto3;
  static readonly typeName = "zitadel.v1.AuthOption";
  static readonly fields: FieldList;

  static fromBinary(
    bytes: Uint8Array,
    options?: Partial<BinaryReadOptions>,
  ): AuthOption;

  static fromJson(
    jsonValue: JsonValue,
    options?: Partial<JsonReadOptions>,
  ): AuthOption;

  static fromJsonString(
    jsonString: string,
    options?: Partial<JsonReadOptions>,
  ): AuthOption;

  static equals(
    a: AuthOption | PlainMessage<AuthOption> | undefined,
    b: AuthOption | PlainMessage<AuthOption> | undefined,
  ): boolean;
}

/**
 * @generated from extension: zitadel.v1.AuthOption auth_option = 50000;
 */
export declare const auth_option: Extension<MethodOptions, AuthOption>;
