import { useState } from 'react';
import { FlexRow, Button, FlexCell, TextInput } from '@epam/uui';

import { ReactComponent as AddIcon } from '@epam/assets/icons/action-add-fill.svg';
import css from './AddGoal.module.scss';



export interface IAddGoalProps {
  onAdd: (goalName: string) => void
}

export default function AddGoal({ onAdd }: IAddGoalProps) {
  const [value, onValueChange] = useState(null);

  const handleOnClick = () => {
    onAdd(value);
    onValueChange('');
  }


  return (<>
    <FlexRow cx={css.root} justifyContent='space-between' columnGap={12}>
      <FlexCell width="auto"  grow={ 1 }>
        <TextInput
          size='60'
          value={ value }
          onValueChange={ onValueChange }
          placeholder='Enter goal name'
        />
      </FlexCell>
      <FlexCell width="auto" >
        <Button 
          caption="Add goal" 
          color='primary'
          size='60' 
          icon={AddIcon} 
          onClick={handleOnClick} 
          isDisabled={!Boolean(value)}
        />
      </FlexCell>
    </FlexRow>
  </>);
}