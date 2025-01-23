import { Metadata } from '@epam/uui-core';

import { IPortfolioDetails } from '../../typings/models/portfolio.models';

export const portfolioValidationSchema = (_: IPortfolioDetails): Metadata<IPortfolioDetails> => ({
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
    goalsOrObjectives: {
      isRequired: true,
      validators: [
        (value: string | undefined) => {
          return !value || value.length === 0
            ? ['Goals / Objectives is required']
            : [];
        }
      ]
    },
    industryStandards: {
      isRequired: true,
      validators: [
        (value: string | undefined) => {
          return !value || value.length === 0
            ? ['Industry Standards is required']
            : [];
        }
      ]
    }
  }
});
