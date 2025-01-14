import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { FormSaveResponse, useUuiContext, UuiContexts } from '@epam/uui-core';
import { SuccessNotification, Text, useForm } from '@epam/uui';

import css from './PortfolioDetails.module.scss';
import { PortfolioDetailsTopBar } from './components';
import { IPortfolioDetails } from '../../typings/models/portfolio.models';
import { portfolioValidationSchema } from './validation.schema';
import { TApi } from '../../data';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loadPortfolio, selectPortfolioDetails, upsertPortfolio, clearPortfolioDetails } from '../../store/data.slice';
import { PortfolioDetailsForm } from '../../components';
import { useParamId } from '../../utilities/route.utility';

const DEFAULT_DATA: IPortfolioDetails = {
  name: '',
  description: '',
  industry: '',
  goalsOrObjectives: '',
  businessCapabilities: '',
  industryStandards: '',
  keyPartners: '',
  keySuppliers: ''
}

export default function PortfolioDetails() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const portfolioId = useParamId();  
  const svc = useUuiContext<TApi, UuiContexts>();

  const onSave = (state: IPortfolioDetails) => {
    return dispatch(upsertPortfolio(state))
    .then(x => ({ form: x.payload } as FormSaveResponse<IPortfolioDetails>));
  }

  useEffect(() => {
    if (portfolioId) {
      dispatch(loadPortfolio(portfolioId));
    } else {
      dispatch(clearPortfolioDetails());
    }
  }, [dispatch, portfolioId])

  const dataFromStore = useAppSelector(selectPortfolioDetails);
  const defaultFormData = dataFromStore ?? structuredClone(DEFAULT_DATA);

  const onSuccess = () => {
    svc.uuiNotifications.show(
      (props) => (
        <SuccessNotification {...props}>
          <Text size='36' fontSize='14'>
            Data has been saved!
          </Text>
        </SuccessNotification>
      ),
      { duration: 2 },
    ).catch(() => null);
  }

  const form = useForm<IPortfolioDetails>({
    settingsKey: 'portfolio-details-form',
    value: defaultFormData,
    beforeLeave: () => Promise.resolve(false),
    loadUnsavedChanges: () => Promise.resolve(),
    getMetadata: portfolioValidationSchema,
    onSave: onSave,
    onSuccess: onSuccess
  });
  form.canRedo = false;

  const onCancel = () => {
    return new Promise<void>(() => {
      form.revert();
      history.goBack();
    });
  }

  return (
    <div className={css.root}>
      <PortfolioDetailsTopBar saveDisabled={form.isInvalid ?? true} save={form.save} cancel={onCancel} />
      <PortfolioDetailsForm form={form} showCaption={true} />
    </div>
  )
}