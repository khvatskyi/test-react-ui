import { Metadata } from '@epam/uui-core';
import { IApiContext } from '../../../../typings/models/module.models';

export const apiContextValidationSchema = (_: IApiContext): Metadata<IApiContext> => ({
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
