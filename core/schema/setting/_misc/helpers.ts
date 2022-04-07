import { TextFieldConfig } from "@keystone-6/core/dist/declarations/src/fields/types/text";
import { BaseListTypeInfo } from "@keystone-6/core/dist/declarations/src/types/type-info";
import { text } from "@keystone-6/core/fields";

const SettingType = {
  text: (data: Partial<TextFieldConfig<BaseListTypeInfo>>) => text({ ...data }),
  longText: (data: Partial<TextFieldConfig<BaseListTypeInfo>>) =>
    text({ ...data }),
};
