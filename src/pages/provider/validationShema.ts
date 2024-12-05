import { Metadata } from '@epam/uui-core';
import { CompanyInfo } from './types';
// import { uuiDayjs } from '../../../helpers';

export const companyInfoSchema = (value: CompanyInfo): Metadata<CompanyInfo> => ({
    props: {
        name: {
            isRequired: true,
            validators: [
              (name: string | undefined) => {
                return !name || name.length === 0 
                                ? ['Company Name is required']
                                : [];
              }
            ]
        },
        description: {
          isRequired: true,
          validators: [
            (description: string | undefined) => {
              return !description || description.length === 0 
                              ? ['Description is required']
                              : [];
            }
          ]
        },
        industry: {
          isRequired: true,
          validators: [
            (industry: string | undefined) => {
              return !industry || industry.length === 0 
                              ? ['Industry is required']
                              : [];
            }
          ]
        },
    },
});
