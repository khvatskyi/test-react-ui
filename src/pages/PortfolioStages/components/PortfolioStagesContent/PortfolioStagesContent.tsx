import { useForm } from '@epam/uui';

import { IPortfolioDetails } from '../../../../typings/models/portfolio.models';

import css from './PortfolioStagesContent.module.scss';
import { portfolioValidationSchema } from '../../../PortfolioDetails/validation.schema';
import PortfolioStagesTopBar from '../PortfolioStagesTopBar/PortfolioStagesTopBar';
import { PortfolioDetailsForm } from '../../../../components';

export interface IPortfolioStagesContentProps {
  portfolio: IPortfolioDetails,
  onUpdateClick: (e?: any) => void
}

export default function PortfolioStagesContent({ portfolio, onUpdateClick }: IPortfolioStagesContentProps) {

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
      <PortfolioStagesTopBar onUpdateClick={onUpdateClick} />
      <PortfolioDetailsForm form={form} showCaption={false}/>
    </div>
  )
}
