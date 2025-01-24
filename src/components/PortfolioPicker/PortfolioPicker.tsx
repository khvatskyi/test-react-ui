import { useEffect } from 'react';
import { PickerInput } from '@epam/uui';
import { useArrayDataSource } from '@epam/uui-core';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { loadPortfolios, selectPortfolios } from '../../store/data.slice';
import { IPortfolio, IPortfolioDetails } from '../../typings/models/portfolio.models';

export interface IPortfolioPickerProps {
  portfolio: IPortfolioDetails;
  onPortfolioChange: (id: string) => void;
  disableClear?: boolean;
}

export default function PortfolioPicker({ portfolio, onPortfolioChange, disableClear = true }: IPortfolioPickerProps) {
  const dispatch = useAppDispatch();
  const portfolios = useAppSelector(selectPortfolios);

  useEffect(() => {
    dispatch(loadPortfolios());
  }, [dispatch]);

  const portfoliosDataSource = useArrayDataSource<IPortfolio, string, unknown>({ items: portfolios }, []);
  const portfolioId = portfolio ? portfolio.id : null;

  return (
    <PickerInput
      dataSource={portfoliosDataSource}
      value={portfolioId}
      onValueChange={onPortfolioChange}
      selectionMode='single'
      getName={(item) => item.name}
      valueType='id'
      id={'select-portfolio'}
      placeholder='Not selected'
      editMode='dropdown'
      disableClear={disableClear}
      isRequired={true}
      searchPosition='none'
    />
  );
}
