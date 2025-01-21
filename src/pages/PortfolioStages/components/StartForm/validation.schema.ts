import { Metadata } from '@epam/uui-core';
import { IStartChatInfo } from '../../../../typings/models/module.models';

export const apiContextValidationSchema = (_: IStartChatInfo): Metadata<IStartChatInfo> => ({
  props: {
    name: {
      isRequired: true,
      validators: [
        (value: string | undefined) => {
          return !value || value.length === 0
            ? ['Portfolio Name is required']
            : [];
        }
      ]
    },
    description: {
      isRequired: true,
      validators: [
        (value: string | undefined) => {
          return !value || value.length === 0
            ? ['Description is required']
            : [];
        }
      ]
    },
  }
});
