import { useEffect } from 'react';
// import { useHistory } from 'react-router-dom';

import { PickerInput } from '@epam/uui';
import { useArrayDataSource } from '@epam/uui-core';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { /*loadPortfolio, */ loadPortfolios, selectPortfolios } from '../../store/data.slice';
import { IPortfolio, IPortfolioDetails } from '../../typings/models/portfolio.models';

export interface IPortfolioPickerProps {
  portfolio: IPortfolioDetails;
  onPortfolioChange: (id: string) => void;
}

export default function PortfolioPicker({ portfolio, onPortfolioChange}: IPortfolioPickerProps) {
  const dispatch = useAppDispatch();
  const portfolios = useAppSelector(selectPortfolios);
  // const history = useHistory();

  useEffect(() => {
    dispatch(loadPortfolios());
  }, [dispatch]);

  const portfoliosDataSource = useArrayDataSource<IPortfolio, string, unknown>({ items: portfolios }, []); 

  // const handlePortfolioChange = (id: string) => {
  //   dispatch(loadPortfolio(id));
  //   history.push(`${id}`);
  // };

  const portfolioId = portfolio ? portfolio.id : '';

  return (
    <PickerInput
      dataSource={ portfoliosDataSource }
      value={ portfolioId }
      onValueChange={ onPortfolioChange }
      selectionMode='single'
      getName={(item) => item.name}
      valueType='id'
      id={'select-portfolio'}
      placeholder='Please select'
      editMode='dropdown'
      disableClear={ true }
      isDisabled={ !Boolean(portfolio)}
      isRequired={ true }
      searchPosition='none'
    />
  );
}
