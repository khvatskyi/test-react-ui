import { useEffect, useState } from 'react';

import { Button, FlexCell, FlexRow, TextInput } from '@epam/uui';
import { IFormApi } from '@epam/uui-core';
import { ReactComponent as iconDelete } from '@epam/assets/icons/action-delete-fill.svg';
import { ReactComponent as iconAdd } from '@epam/assets/icons/action-add-fill.svg';

import { IExtendedClientProfileInfo } from '../ClientProfile.models';

interface IItemListProps {
  form: IFormApi<IExtendedClientProfileInfo>
  controlName: keyof IExtendedClientProfileInfo;
}

export function ItemList({ form: { lens }, controlName }: IItemListProps) {

  const control = lens.prop(controlName).toProps();
  const initialValue = control.value as string[];
  const [sanitizedValues, setSanitizedValues] = useState(initialValue ?? ['']);

  useEffect(() => {
    if (initialValue) {
      setSanitizedValues(initialValue ?? ['']);
    }
  }, [initialValue]);

  const handleValueChange = (newValue: string, index: number) => {
    const clone = structuredClone(sanitizedValues);
    clone[index] = newValue ?? '';
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

    if (clone.length > 0 && !clone.slice(-1)[0]) {
      return;
    }

    clone.push('')
    setSanitizedValues(clone);
  }

  return (<>
    {
      sanitizedValues.map((value, index) =>
        <FlexRow key={index} vPadding='24'>
          <FlexCell minWidth={324} width='100%'>
            <TextInput id={value} value={value} onValueChange={(newValue) => handleValueChange(newValue!, index)} placeholder='Not specified' icon={iconDelete} iconPosition='right' onIconClick={() => deleteItem(index)} />
          </FlexCell>
        </FlexRow>
      )
    }
    <Button icon={iconAdd} onClick={addItem} iconPosition='left' caption='Add' fill='ghost' color='neutral' />
  </>)
}