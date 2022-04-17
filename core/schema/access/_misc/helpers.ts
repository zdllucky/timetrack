import {
  BaseListTypeInfo,
  KeystoneContext,
  MaybePromise,
} from "@keystone-6/core/types";
import { BaseAccessArgs, FilterOutput, SystemAccess } from "./types";
import { AccessTypes } from "../index";
import { QueryAccessesArgs } from "../../../schema_types";

/**
 * Adds new system access
 */
export const declareAccess = (access: SystemAccess) =>
  <SystemAccess>{
    name: access.name || "",
    label: access.label,
    description: access.description,
    contains: access.contains || [],
    type: access.type ?? AccessTypes.SYSTEM,
  };

const filterUnique = <T>(arr: Array<T>) => Array.from<T>(new Set<T>(arr));

export const pa = ({ context }: { context: KeystoneContext }) => {
  return async ([a]: TemplateStringsArray): Promise<string[]> => {
    let parentAccesses = a.split(",");

    let currentAccesses = filterUnique(parentAccesses);

    while (currentAccesses.length) {
      currentAccesses = filterUnique(
        (
          await context.sudo().query.Access.findMany(<QueryAccessesArgs>{
            where: { contains: { some: { name: { in: currentAccesses } } } },
            query: "name",
          })
        ).map(({ name }) => name)
      );

      parentAccesses = filterUnique([...parentAccesses, ...currentAccesses]);
    }

    return parentAccesses;
  };
};

/**
 * Checks list operation/filter and field access. Additional resolvers are passed to optional field.
 */
export const a = <A extends BaseAccessArgs<T>, T extends BaseListTypeInfo>(
  data: A,
  optional: ((A) => MaybePromise<boolean>) | FilterOutput<T> = async () => true
) => {
  const rootCtx = (data.context as KeystoneContext).sudo();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async ([a]: TemplateStringsArray): Promise<any> => {
    const allowedAccesses = a.split(",");

    let subAccesses = data.session?.data?.access;

    if (!subAccesses) return false;

    while (subAccesses?.length) {
      if (subAccesses.some(({ name }) => allowedAccesses.includes(name))) {
        return typeof optional === "function"
          ? await (optional as (A) => MaybePromise<boolean>)(data)
          : (optional as FilterOutput<T>);
      }

      subAccesses = await rootCtx.query.Access.findMany(<QueryAccessesArgs>{
        where: {
          isContainedIn: {
            some: { name: { in: subAccesses.map(({ name }) => name) } },
          },
        },
        query: "name",
      });
    }

    return false;
  };
};

/**
 * Filter access checkers "OR" aggregation method
 */
export const filterOr = <T extends BaseListTypeInfo>(
  ...filter: (boolean | FilterOutput<T>)[]
) =>
  filter.includes(true) || { OR: filter.filter((v) => typeof v !== "boolean") };

/**
 * Filter access checkers "AND" aggregation method
 */
export const filterAnd = <T extends BaseListTypeInfo>(
  ...filter: (boolean | FilterOutput<T>)[]
) =>
  filter.includes(false) && {
    AND: filter.filter((v) => typeof v !== "boolean"),
  };
