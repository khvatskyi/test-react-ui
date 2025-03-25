import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { FormSaveResponse, useUuiContext } from '@epam/uui-core';
import { ScrollBars, useForm } from '@epam/uui';

import css from './PortfolioDetails.module.scss';
import { PortfolioDetailsTopBar } from './components';
import { IPortfolioDetails } from '../../typings/models/portfolio.models';
import { portfolioValidationSchema } from './validation.schema';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loadPortfolio, selectPortfolioDetails, upsertPortfolio, clearPortfolioDetails } from '../../store/data.slice';
import { PortfolioDetailsForm } from '../../components';
import { useParamId } from '../../utilities/route.utility';
import { useShowSuccessNotification } from '../../utilities/notifications.utility';
import { LeavePageConfirmation } from '../../components/LeavePageConfirmation/LeavePageConfirmation';
import { selectBackUrl } from '../../store/app.slice';

const DEFAULT_DATA: IPortfolioDetails = {
  name: '',
  description: '',
  industry: null,
  goalsOrObjectives: '',
  businessCapabilities: null,
  industryStandards: '',
  keyPartners: null,
  keySuppliers: null
}

export default function PortfolioDetails() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const portfolioId = useParamId();  
  const { uuiModals } = useUuiContext();
  const showSuccessNotification = useShowSuccessNotification();
  const backUrl = useAppSelector(selectBackUrl);

  useEffect(() => {
    if (portfolioId) {
      dispatch(loadPortfolio(portfolioId));
    } else {
      dispatch(clearPortfolioDetails());
    }
  }, [dispatch, portfolioId])

  const dataFromStore = useAppSelector(selectPortfolioDetails);
  const defaultFormData = dataFromStore ?? structuredClone(DEFAULT_DATA);
  const fromCaption = defaultFormData?.name ? defaultFormData.name :  'Create a portfolio'

  const onSave = (state: IPortfolioDetails) => {
    return dispatch(upsertPortfolio(state))
    .then(x => ({ form: x.payload } as FormSaveResponse<IPortfolioDetails>));
  }

  const onSuccess = () => {
    showSuccessNotification('Data has been saved!')
  }

  const beforeLeave = useCallback((): Promise<boolean> => {
    return uuiModals.show<boolean>((modalProps) => <LeavePageConfirmation { ...modalProps } />);
  }, [uuiModals]);

  const form = useForm<IPortfolioDetails>({
    settingsKey: 'portfolio-details-form',
    value: defaultFormData,
    beforeLeave: beforeLeave,
    loadUnsavedChanges: () => Promise.reject(),
    getMetadata: portfolioValidationSchema,
    onSave: onSave,
    onSuccess: onSuccess
  });
  form.canRedo = false;

  const onCancel = () => {
    return new Promise<void>(() => {
      history.push(backUrl ? backUrl : '/portfolios');
    });
  }

  return (
    <div className={css.root}>
      <PortfolioDetailsTopBar saveDisabled={form.isInvalid ?? true} onSave={form.save} onCancel={onCancel} />
      <div className={ css.content }>
        <ScrollBars>
          <PortfolioDetailsForm form={form} showCaption={true} fromCaption={fromCaption} />
        </ScrollBars>
      </div>
    </div>
  )
}