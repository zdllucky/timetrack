import { ListHooks } from "@keystone-6/core/dist/declarations/src/types/config/hooks";
import { BaseListTypeInfo } from "@keystone-6/core/dist/declarations/src/types/type-info";
import { MutationCreateHistoryArgs } from "../../../schema_types";

export const updateHistory: ListHooks<BaseListTypeInfo>["afterOperation"] =
  async ({ listKey, operation, originalItem, item, resolvedData, context }) => {
    await context.sudo().query.History.createOne(<MutationCreateHistoryArgs>{
      data: {
        list: listKey,
        ref: originalItem?.id ?? item?.id,
        at: new Date().toISOString(),
        operation,
        updatedFields: Object.keys(resolvedData ?? {}),
        by: context.session ? context.session.itemId : "system/public",
      },
    });
  };
