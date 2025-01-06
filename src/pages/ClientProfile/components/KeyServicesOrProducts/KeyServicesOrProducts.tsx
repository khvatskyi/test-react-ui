import { useEffect, useState } from 'react';

import { IFormApi } from '@epam/uui-core';
import { Button, FlexCell, FlexRow, LabeledInput, TextArea, TextInput } from '@epam/uui';
import { ReactComponent as iconDelete } from '@epam/assets/icons/action-delete-fill.svg';
import { ReactComponent as iconAdd } from '@epam/assets/icons/action-add-fill.svg';

import { IClientProfileInfo, IKeyServicesOrProducts } from '../../../../typings/models/client-info.models';

export interface IKeyServicesOrProductsProps {
  form: IFormApi<IClientProfileInfo>
  controlName: keyof IClientProfileInfo;
}

export default function KeyServicesOrProducts({ form: { lens }, controlName }: IKeyServicesOrProductsProps) {
  const control = lens.prop(controlName).toProps();
  const initialValue = control.value as IKeyServicesOrProducts[];
  const [sanitizedValues, setSanitizedValues] = useState(initialValue ?? []);

  useEffect(() => {
    if (initialValue) {
      setSanitizedValues(initialValue ?? []);
    }
  }, [initialValue]);

  const handleValueChange = <T extends keyof IKeyServicesOrProducts>(fieldName: T, newValue: IKeyServicesOrProducts[T], index: number) => {
    const clone = structuredClone(sanitizedValues);
    clone[index][fieldName] = newValue ?? null;
    setSanitizedValues(clone);
    control.onValueChange(clone);
  }

  const deleteItem = (index: number) => {
    const clone = structuredClone(sanitizedValues);
    clone.splice(index, 1);

    setSanitizedValues(clone);
    control.onValueChange(clone);
  }

  const addItem = () => {
    const clone = structuredClone(sanitizedValues);

    const lastElement = clone.length > 0 && clone.slice(-1)[0];

    if (lastElement && !lastElement.service && !lastElement.description) {
      return;
    }

    clone.push({ service: '', description: '' })
    setSanitizedValues(clone);
  }

  return (
    <>
      {
        sanitizedValues.map((value, index) => {
          const commonIdPart = index + '_' + (typeof KeyServicesOrProducts);
          const serviceId = commonIdPart + '_service';
          const descriptionId = commonIdPart + '_description';

          return (
            <FlexRow columnGap='12' key={commonIdPart} vPadding='24'>
              <FlexCell minWidth={324} grow={1}>
                <FlexRow>
                  <LabeledInput htmlFor={serviceId} label='Service'>
                    <TextInput id={serviceId} placeholder='Please type text' value={value.service} onValueChange={(newValue) => handleValueChange('service', newValue, index)} />
                  </LabeledInput>
                </FlexRow>
                <FlexRow vPadding='24'>
                  <LabeledInput htmlFor={descriptionId} label='Description'>
                    <TextArea id={descriptionId} placeholder='Please type text' rows={3} value={value.description} onValueChange={(newValue) => handleValueChange('description', newValue, index)} />
                  </LabeledInput>
                </FlexRow>
              </FlexCell>
              <Button icon={iconDelete} onClick={() => deleteItem(index)} iconPosition='right' fill='ghost' color='neutral' />
            </FlexRow>
          );
        })
      }
      <Button icon={iconAdd} onClick={addItem} iconPosition='left' caption='Add' fill='ghost' color='neutral' />
    </>
  );
}