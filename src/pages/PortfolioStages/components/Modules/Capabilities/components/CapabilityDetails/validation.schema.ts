import { Metadata } from '@epam/uui-core';
import { ICapabilitiesOwnerDetails } from '../../../../../../../typings/models/capabilities.model';

export const capabilitiesDetailsValidationSchema = (_: ICapabilitiesOwnerDetails): Metadata<ICapabilitiesOwnerDetails> => ({
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
    category: {
      isRequired: true,
      validators: [
        (value: string | undefined) => {
          return !value || value.length === 0
            ? ['Category is required']
            : [];
        }
      ]
    },
    ownerName: {
      isRequired: true,
      validators: [
        (value: string | undefined) => {
          return !value || value.length === 0
            ? ['Name is required']
            : [];
        }
      ]
    },
    ownerEmail: {
      isRequired: true,
      validators: [
        (value: string | undefined) => {
          return !value || value.length === 0
            ? ['Email is required']
            : [];
        }
      ]
    },
  }
});
