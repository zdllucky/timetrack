import { json } from "@keystone-6/core/fields";
import { ListHooks } from "@keystone-6/core/dist/declarations/src/types/config/hooks";
import { BaseListTypeInfo } from "@keystone-6/core/dist/declarations/src/types/type-info";

export const updateHistory: ListHooks<BaseListTypeInfo>["afterOperation"] =
  async ({ operation, originalItem, item, resolvedData, context }) => {
    if (
      operation !== "delete" &&
      (operation === "create" || !resolvedData["history"])
    )
      await context.sudo().query.User.updateOne({
        where: { id: item.id as string },
        data: {
          history: [
            {
              at: Date.now(),
              operation,
              updatedFields: Object.keys(resolvedData),
              by: context.session
                ? {
                    id: context.session.itemId,
                    login: context.session.data.login,
                  }
                : {
                    id: "system/public",
                  },
            },
            ...(originalItem ? (originalItem.historyLogs as []) : []),
          ],
        },
      });
  };

export const history = () =>
  json({
    ui: {
      listView: {
        fieldMode: "hidden",
      },
      itemView: { fieldMode: "read" },
      createView: { fieldMode: "hidden" },
    },
    defaultValue: [],
    access: {
      update: () => false,
      create: () => false,
    },
  });
