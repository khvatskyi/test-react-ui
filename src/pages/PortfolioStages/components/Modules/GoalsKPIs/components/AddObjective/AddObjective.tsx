import { useState } from 'react';
import { FlexRow, Button, FlexCell, TextInput } from '@epam/uui';
import css from './AddObjective.module.scss';

import { ReactComponent as AddIcon } from '@epam/assets/icons/action-add-fill.svg';



export interface IAddObjectiveProps {
  goalId: any; 
  onAddObjective: (goalId: string, value: string) => void
}

export default function AddObjective({goalId, onAddObjective }: IAddObjectiveProps) {
  const [value, onValueChange] = useState(null);

  const handleOnClick = () => {
    onAddObjective(goalId, value)
    onValueChange('');
  }

  return (<>
    <FlexRow cx={css.root} justifyContent='space-between' columnGap={12}>
      <FlexCell width="auto"  grow={ 1 }>
        <TextInput
          size='42'
          value={ value }
          onValueChange={ onValueChange }
          placeholder='Enter objective name'
        />
      </FlexCell>
      <FlexCell width="auto" >
        <Button 
          caption="Add objective" 
          color='primary' 
          size='42' 
          onClick={handleOnClick} 
          icon={AddIcon} 
          isDisabled={!Boolean(value)}
        />
      </FlexCell>
    </FlexRow>
  </>);
}