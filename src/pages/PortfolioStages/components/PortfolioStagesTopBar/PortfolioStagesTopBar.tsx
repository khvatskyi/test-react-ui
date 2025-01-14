import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Button, FlexRow, FlexCell, FlexSpacer, Panel, PickerInput } from '@epam/uui';
import { useArrayDataSource } from '@epam/uui-core';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { loadPortfolio, loadPortfolios, selectPortfolioDetails, selectPortfolios } from '../../../../store/data.slice';

import css from './PortfolioStagesTopBar.module.scss';
import { IPortfolio } from '../../../../typings/models/portfolio.models';

export interface IPortfolioStagesTopBarProps {
  title: string;
  onUpdateClick: () => void
}

export default function PortfolioStagesTopBar({ title, onUpdateClick}: IPortfolioStagesTopBarProps) {
  const dispatch = useAppDispatch();
  const portfolios = useAppSelector(selectPortfolios);
  const selectedPortfolio = useAppSelector(selectPortfolioDetails);
  const history = useHistory();

  useEffect(() => {
    dispatch(loadPortfolios());
  }, [dispatch]);

  const portfoliosDataSource = useArrayDataSource<IPortfolio, string, unknown>({ items: portfolios }, []); 

  const handlePortfolioChange = (id: string) => {
    dispatch(loadPortfolio(id));
    history.push(`${id}`);
  };

  return selectedPortfolio && (
    <Panel cx={css.buttonPanel}>
      <FlexRow columnGap='24' cx={css.buttonPanel}>
        <h2>{title}</h2>
        <FlexCell width='auto'>
          <PickerInput
            dataSource={ portfoliosDataSource }
            value={ selectedPortfolio.id }
            onValueChange={ handlePortfolioChange }
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
