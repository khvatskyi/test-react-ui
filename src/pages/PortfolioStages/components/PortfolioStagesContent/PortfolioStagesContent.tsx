import { useForm } from '@epam/uui';
// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';

import { IPortfolioDetails } from '../../../../typings/models/portfolio.models';
// import { useAppDispatch, useAppSelector } from '../../../../hooks';
// import { selectPortfolioDetails } from '../../../../store/data.slice';

import css from './PortfolioStagesContent.module.scss';
import { portfolioValidationSchema } from '../../../PortfolioDetails/validation.schema';
import PortfolioStagesTopBar from '../PortfolioStagesTopBar/PortfolioStagesTopBar';
import { PortfolioDetailsForm } from '../../../../components';

export interface IPortfolioStagesContentProps {
  portfolio: IPortfolioDetails,
  onUpdateClick: (e?: any) => void
}

export default function PortfolioStagesContent({ portfolio, onUpdateClick }: IPortfolioStagesContentProps) {
  // const dispatch = useAppDispatch();
  // const { id } = useParams<{ id?: string }>();

  // useEffect(() => {
  //   if (id) {
  //     dispatch(loadPortfolio(id));
  //   }
  // }, [dispatch, id])

  // const dataFromStore = useAppSelector(selectPortfolioDetails);

  const form = useForm<IPortfolioDetails>({
    settingsKey: 'portfolio-details-form',
    value: portfolio,
    beforeLeave: () => Promise.resolve(false),
    loadUnsavedChanges: () => Promise.resolve(),
    getMetadata: portfolioValidationSchema,
    onSave: () => Promise.resolve(),
  });
  form.canRedo = false;
  form.isDisabled = true;
  return (
    <div className={css.root}>
      <PortfolioStagesTopBar title='About Portfolio' onUpdateClick={onUpdateClick} />
      <PortfolioDetailsForm form={form} />
    </div>
  )
}
