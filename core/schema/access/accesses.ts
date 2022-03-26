import { declareAccess, SystemAccess } from "./helpers";

export const accessAccesses: Array<SystemAccess> = [
  declareAccess({ name: "QueryAnyAccess" }),
  declareAccess({ name: "CreateAnyAccess" }),
  declareAccess({ name: "UpdateAnyAccess" }),
  declareAccess({ name: "DeleteAnyAccess" }),
  declareAccess({
    name: "AdminAnyAccess",
    contains: [
      "QueryAnyAccess",
      "CreateAnyAccess",
      "UpdateAnyAccess",
      "DeleteAnyAccess",
    ],
  }),
];

// const fn = (d: TemplateStringsArray, prev?: boolean) => {
//   return (d?: TemplateStringsArray | undefined) =>
//     fn(d, prev ?? d[0] === "true");
// };

// console.log(fn`as``as``as``as`());

// const fn = (b: TemplateStringsArray | (() => boolean), prev = true) => {
//   return (d?: TemplateStringsArray | (() => boolean)) =>
//     d
//       ? fn(
//           d,
//           prev &&
//             (typeof b === "function"
//               ? b()
//               : (b as TemplateStringsArray)[0] === "true")
//         )
//       : () => prev;
// };
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
// console.log(fn`true``true``true``true`(() => true)`true`()());
