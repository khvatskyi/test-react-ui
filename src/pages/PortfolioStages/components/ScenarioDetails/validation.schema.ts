import { Metadata } from '@epam/uui-core';
import { IScenarioDetails } from '../../../../typings/models/product-journey.model';

export const scenarioDetailsValidationSchema = (_: IScenarioDetails): Metadata<IScenarioDetails> => ({
  props: {
    name: {
      isRequired: true,
      validators: [
        (value: string | undefined) => {
          return !value || value.length === 0
            ? ['Name is required']
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
