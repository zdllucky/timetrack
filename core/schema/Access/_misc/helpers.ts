import {
  BaseListTypeInfo,
  KeystoneContext,
  MaybePromise,
} from "@keystone-6/core/types";
import { BaseAccessArgs, FilterOutput, SystemAccess } from "./types";
import { AccessTypes } from "../index";
import type { Access, QueryAccessesArgs } from "../../../schema_types";

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
  optional:
    | ((arg: A & { item?: T["item"] }) => MaybePromise<boolean>)
    | FilterOutput<T> = async () => true
) => {
  const rootCtx = (data.context as KeystoneContext).sudo();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async ([a]: TemplateStringsArray): Promise<any> => {
    const allowedAccesses = a.split(",");

    let subAccesses: readonly Record<"name", string>[] =
      data.session?.data?.access;

    if (!subAccesses) return false;

    while (subAccesses?.length) {
      if (subAccesses.some(({ name }) => allowedAccesses.includes(name))) {
        return typeof optional === "function"
          ? await (optional as (arg: A) => MaybePromise<boolean>)(data)
          : (optional as FilterOutput<T>);
      }

      subAccesses = (await rootCtx.query.Access.findMany(<QueryAccessesArgs>{
        where: {
          isContainedIn: {
            some: { name: { in: subAccesses.map(({ name }) => name) } },
          },
        },
        query: "name",
      })) as Array<Required<Pick<Access, "name">>>;
    }

    return false;
  };
};

// WISH: Optimize async operations calculation for filter
export const condition = {
  filter: {
    or: <T extends BaseListTypeInfo>(
      ...filter: (boolean | FilterOutput<T>)[]
    ) =>
      filter.includes(true) || {
        OR: filter.filter((v) => typeof v !== "boolean"),
      },
    and: <T extends BaseListTypeInfo>(
      ...filter: (boolean | FilterOutput<T>)[]
    ) =>
      filter.includes(false) && {
        AND: filter.filter((v) => typeof v !== "boolean"),
      },
  },
  async: {
    and: async (...fn: []) =>
      (await Promise.all(fn)).reduce((ch, v) => ch && v, true),
    or: async (...fn: []) =>
      (await Promise.all(fn)).reduce((ch, v) => ch || v, false),
  },
};
