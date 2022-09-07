import { FieldHooks } from "@keystone-6/core/dist/declarations/src/types/config/hooks";
import { BaseListTypeInfo } from "@keystone-6/core/dist/declarations/src/types/type-info";
import {
  Department,
  DepartmentWhereUniqueInput,
  QueryDepartmentArgs,
} from "../../../schema_types";

const DepartmentHooks: {
  checkForCircularDepartments: NonNullable<
    FieldHooks<BaseListTypeInfo>["validateInput"]
  >;
  prohibitSetAction: NonNullable<FieldHooks<BaseListTypeInfo>["validateInput"]>;
} = {
  checkForCircularDepartments: async ({
    context,
    resolvedData,
    addValidationError,
    item,
    operation,
  }) => {
    const ac = context.sudo();

    const departmentTree: string[] = [];
    let forwarderId: string | undefined;

    if (operation === "update") {
      if (
        (resolvedData.controls?.connect || []).reduce(
          (solution: boolean, { id, name }: DepartmentWhereUniqueInput) =>
            solution || (id ? id === item?.id : name === item?.name),
          false
        )
      )
        addValidationError("Departments can't have circular hierarchy.");

      const { id, name } = resolvedData.isControlledBy?.connect || {};

      if (id === item?.id || name === item?.name)
        addValidationError("Departments can't have circular hierarchy.");
    }
    if (
      operation === "create" &&
      resolvedData.controls?.connect &&
      resolvedData.isControlledBy?.connect
    ) {
      forwarderId =
        resolvedData.isControlledBy.connect.id ??
        (
          await ac.query.Department.findOne(<QueryDepartmentArgs>{
            where: { name: resolvedData.isControlledBy.connect.name },
            query: "id",
          })
        ).id;

      departmentTree.push(
        ...(await Promise.all(
          resolvedData.controls.connect.map(
            async ({ id, name }: DepartmentWhereUniqueInput) =>
              id ??
              (
                await ac.query.Department.findOne(<QueryDepartmentArgs>{
                  where: { name },
                  query: "id",
                })
              ).id
          )
        )),
        resolvedData.isControlledBy.connect.id ??
          (
            await ac.query.Department.findOne(<QueryDepartmentArgs>{
              where: { name: resolvedData.isControlledBy.connect.name },
              query: "id",
            })
          ).id
      );
    } else if (
      operation === "update" &&
      (resolvedData.controls?.connect || resolvedData.isControlledBy?.connect)
    ) {
      // Accumulate controls
      // If only one then return
      // Else set isControlledBy as forwardId, [...controls, isControlledBy] as departmentTree

      if (
        resolvedData.isControlledBy?.connect?.id ||
        resolvedData.isControlledBy?.connect?.name
      )
        forwarderId =
          resolvedData.isControlledBy?.connect?.id ??
          (
            await ac.query.Department.findOne(<QueryDepartmentArgs>{
              where: { name: resolvedData.isControlledBy?.connect?.name },
              query: "id",
            })
          )?.id;

      forwarderId ??= (
        await ac.query.Department.findOne(<QueryDepartmentArgs>{
          where: { id: item.id.toString() },
          query: "isControlledBy {id}",
        })
      )?.isControlledBy?.id;

      departmentTree.push(
        ...(await Promise.all(
          (resolvedData.controls?.connect ?? []).map(
            async ({ id, name }: DepartmentWhereUniqueInput) =>
              id ??
              (
                await ac.query.Department.findOne(<QueryDepartmentArgs>{
                  where: { name },
                  query: "id",
                })
              ).id
          )
        )),
        ...(
          (
            await ac.query.Department.findOne(<QueryDepartmentArgs>{
              where: { id: item.id.toString() },
              query: "controls {id}",
            })
          )?.controls ?? []
        ).map(({ id }: Department) => id)
      );

      if (!departmentTree.length) return;
    } else return;

    while (forwarderId) {
      const { id, isControlledBy } = await ac.query.Department.findOne(<
        QueryDepartmentArgs
      >{
        where: { id: forwarderId },
        query: "id, isControlledBy {id}",
      });

      if (departmentTree.includes(id))
        addValidationError("Departments can't have circular hierarchy.");
      else departmentTree.push(id);

      forwarderId = isControlledBy?.id;
    }
  },
  prohibitSetAction: async ({ resolvedData, addValidationError }) => {
    const controlsOnSet = !!resolvedData.controls?.set;
    const isControlledByOnSet = !!resolvedData.isControlledBy?.set;

    (controlsOnSet || isControlledByOnSet) &&
      addValidationError("Set is not applicable for Department.");
  },
};

export default DepartmentHooks;
