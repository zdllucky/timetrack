import { MaybePromise } from "@keystone-6/core/dist/declarations/src/types/utils";
import { KeystoneContext } from "@keystone-6/core/types";

export type SystemAccess = {
  name: string;
  label?: string;
  description?: string;
  contains?: Array<string>;
  isContainedIn?: Array<string>;
  resolver?: (data: Array<unknown>) => MaybePromise<boolean> | undefined;
};

export const declareAccess = (access: SystemAccess) =>
  <SystemAccess>{
    name: access.name || "",
    label: access.label,
    description: access.description,
    contains: access.contains || [],
    resolver: access.resolver,
  };

// export const oAccess = () => true;
// export const fAccess = () => true;
// export const iAccess = () => true;

export const access = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>
  // optional?: Record<string, unknown>
) => {
  const rootCtx = (data.context as KeystoneContext).sudo();

  return async ([a]: TemplateStringsArray) => {
    const allowedAccesses = a.split(",");

    let subAccesses = data.session?.data?.access;

    if (!subAccesses) return false;

    while (subAccesses?.length) {
      if (subAccesses.some(({ name }) => allowedAccesses.includes(name)))
        return true;

      subAccesses = await rootCtx.query.Access.findMany({
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

// type Context = "34";
//
// const ctx: Context = "34";
//
// type Payload = TemplateStringsArray | ((v: Context) => boolean) | Context;
//
// const fn =
//   (b: Payload, prev: Payload[] = []) =>
//   (d?: Payload) =>
//     d !== "34" && d ? fn(d, [...(prev.length ? prev : [b]), d]) : prev;
//
// // @ts-ignore
// console.log(fn`true``true``false``true`(() => true)`true`(ctx));

//
// type A<T extends "Q" | "W"> = (r: { d: T }) => boolean;
//
// type B<T extends "Q" | "W"> = () => T;
//
// type Z = {
//   operation: A<"Q">;
//   filter?: B<"W">;
// };
//
// const obj: Z = {
//   operation: ({ d }) => d === "Q",
// };
//
// console.log(obj.operation({ d: "Q" }));
//
