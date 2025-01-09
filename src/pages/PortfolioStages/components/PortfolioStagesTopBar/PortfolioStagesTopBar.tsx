import { useState } from 'react';
import { Button, FlexRow, FlexCell, FlexSpacer, Panel, PickerInput } from '@epam/uui';
import { useArrayDataSource } from '@epam/uui-core';

import { useAppSelector } from '../../../../hooks';
import { selectPortfolios } from '../../../../store/data.slice';

import css from './PortfolioStagesTopBar.module.scss';

export interface IPortfolioStagesTopBarProps {
  title: string;
  onUpdateClick: () => void
}

export default function PortfolioStagesTopBar({ title, onUpdateClick}: IPortfolioStagesTopBarProps) {
  const [value, onValueChange] = useState<number[]>();

  const portfolios = useAppSelector(selectPortfolios);
  const items = portfolios ? portfolios.map((x) => ({ id: x.id, name: x.name })) : [{id: '', name: ''}];
  const portfoliosDataSource = useArrayDataSource({ items: items }, []); 
  
  return (
    <Panel cx={css.buttonPanel}>
      <FlexRow columnGap='24' cx={css.buttonPanel}>
        <h2>{title}</h2>
        <FlexCell width='auto'>
          <PickerInput
            dataSource={ portfoliosDataSource }
            value={ value }
            onValueChange={ onValueChange }
            selectionMode='single'
            getName={(item) => item.name}
            valueType='id'
            id={'select-portfolio'}
            placeholder='Please select'
            editMode='dropdown'
            disableClear={ true }
            isRequired={ true }
            searchPosition='none'
          />
        </FlexCell>
        <FlexSpacer />
        <Button caption='Update portfolio' color='primary' fill='outline' onClick={onUpdateClick} />
      </FlexRow>        
    </Panel>
  );
}
