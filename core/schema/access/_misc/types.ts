import {
  BaseListTypeInfo,
  KeystoneContextFromListTypeInfo,
} from "@keystone-6/core/types";
import { MaybePromise } from "@keystone-6/core/dist/declarations/src/types/utils";
import type { AccessTypes } from "../index";

/**
 * Proxy type aggregator
 */
export declare type BaseAccessArgs<ListTypeInfo extends BaseListTypeInfo> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
  listKey: string;
  context: KeystoneContextFromListTypeInfo<ListTypeInfo>;
};

/**
 * Proxy type aggregator
 */
export declare type FilterOutput<ListTypeInfo extends BaseListTypeInfo> =
  | boolean
  | ListTypeInfo["inputs"]["where"];

/**
 * System access type
 */
export type SystemAccess = {
  name: string;
  label?: string;
  type?: AccessTypes;
  description?: string;
  contains?: Array<string>;
  resolver?: (data: Array<unknown>) => MaybePromise<boolean> | undefined;
};

export type AccessResolvers = Record<
  string,
  <A extends BaseAccessArgs<T>, T extends BaseListTypeInfo>(
    data: A
    // eslint-disable-next-line
  ) => Promise<any>
>;
