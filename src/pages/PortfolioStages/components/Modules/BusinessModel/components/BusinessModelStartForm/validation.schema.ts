import { Metadata } from '@epam/uui-core';
import { IBusinessModelStartDetails } from '../../../../../../../typings/models/business-model.models';

export const businessModelStartFormValidationSchema = (_: IBusinessModelStartDetails): Metadata<IBusinessModelStartDetails> => ({
  props: {
    valueCreationModelName: {
      isRequired: true,
      validators: [
        (value: string | undefined) => {
          return !value || value.length === 0
            ? ['Model is required']
            : [];
        }
      ]
    },
  }
});
