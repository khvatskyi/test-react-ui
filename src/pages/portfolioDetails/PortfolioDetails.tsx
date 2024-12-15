import { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { useUuiContext, UuiContexts } from "@epam/uui-core";
import { SuccessNotification, Text, useForm } from "@epam/uui";

import { PortfolioDetailsTopBar } from "./components/PortfolioDetailsTopBar";
import { PortfolioDetailsForm } from "./components/PortfolioForm";
import { IPortfolioDetails } from "./portfolioDetails.models";
import { portfolioValidationSchema } from "./validation.schema";
import { TApi } from "../../data";

import css from './PortfolioDetails.module.scss';

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

const CustomData: IPortfolioDetails = {
  name: 'CustomData',
  description: 'CustomData',
  industry: 'Insurance',
  goalsOrObjectives: 'CustomData',
  businessCapabilities: 'CustomData',
  industryStandards: 'CustomData',
  keyPartners: 'CustomData',
  keySuppliers: 'CustomData'
}


export function PortfolioDetails() {
  const { id } = useParams<{ id?: string }>();
  const history = useHistory();
  const svc = useUuiContext<TApi, UuiContexts>();
  const dataFromStore = id ? CustomData : null;
  const defaultFormData = dataFromStore ?? structuredClone(DEFAULT_DATA);

  const onSave = (state: IPortfolioDetails) => {
    return new Promise<void>(() => { alert('Saved') });
  }

  const onSuccess = () => {
    svc.uuiNotifications.show(
      (props) => (
        <SuccessNotification {...props}>
          <Text size="36" fontSize="14">
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
    getMetadata: portfolioValidationSchema,
    onSave: onSave,
    onSuccess: onSuccess
  });
  form.canRedo = false;

  const onCancel = () => {
    return new Promise<void>(() => {
      form.revert()
      if (!id) {
        history.push('/portfolios');
      }
    });
  }

  return (
    <div className={css.root}>
      <PortfolioDetailsTopBar save={form.save} cancel={onCancel} />
      <PortfolioDetailsForm form={form} />
    </div>
  )
}