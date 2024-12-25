import { useHistory } from "react-router-dom";

import { FormSaveResponse, UuiContexts, useUuiContext } from '@epam/uui-core';
import { SuccessNotification, ErrorNotification, Text, useForm } from '@epam/uui';

import { ClientDefinitionTopBar } from './components/ClientDefinitionTopBar';
import { IClientDefinitionInfo } from './ClientDefinition.models';
import { defaultClientDefinitionData } from './constants';
import { clientDefinitionValidationSchema } from './validation.schema';
import type { TApi } from '../../data';
import { ClientDefinitionForm } from './components/ClientDefinitionForm';
import DataLoading from '../../components/DataLoading';

import css from './ClientDefinition.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loadClientDefinitionInfo, saveClientDefinitionInfo, selectIsDataLoading, selectClientDefinition } from '../../store/data.slice';
import { useEffect } from 'react';
import { IAiClientDefinitionFillRequest } from '../../models/ai.models';
import { sendClientDefinitionFillMessage } from '../../services/ai.service';

export function ClientDefinitionDetails() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const dataFromStore = useAppSelector(selectClientDefinition);
  const isLoading = useAppSelector(selectIsDataLoading);

  useEffect(() => {
    dispatch(loadClientDefinitionInfo());
  }, [dispatch]);

  const svc = useUuiContext<TApi, UuiContexts>();
  const defaultFormData = dataFromStore ?? defaultClientDefinitionData;

  const onSave = (state: IClientDefinitionInfo) => {
    return dispatch(saveClientDefinitionInfo(state))
      .then(x => ({ form: x.payload as IClientDefinitionInfo } as FormSaveResponse<IClientDefinitionInfo>));
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

  const showError = (message: string) => {
    svc.uuiNotifications.show(
      (props) => (
        <ErrorNotification {...props}>
          <Text size="36" fontSize="14">
            {message}
          </Text>
        </ErrorNotification>
      ),
      { duration: 3 },
    ).catch(() => null);
  }


  const form = useForm<IClientDefinitionInfo>({
    settingsKey: 'client-definition-form',
    value: defaultFormData,
    getMetadata: clientDefinitionValidationSchema,
    beforeLeave: () => Promise.resolve(false),
    loadUnsavedChanges: () => Promise.resolve(),
    onSave: onSave,
    onSuccess: onSuccess
  });

  const handleSaveClientDefinition = () => {
    history.push('/client-profile');
    // form.save()
  }

  const handleFillClientDefinitionWithAI = () => {
    const name = form.lens.prop('name').toProps().value
    const requestMessage: IAiClientDefinitionFillRequest = {
      name: name
    };

    sendClientDefinitionFillMessage(requestMessage).then(data => {
      const set: React.SetStateAction<IClientDefinitionInfo> = {
        name: data.name ??  form.lens.prop('name').toProps().value,
        size: data.size ??  form.lens.prop('size').toProps().value,
        description: data.description ?? form.lens.prop('description').toProps().value,
        industry: data.industry ??  form.lens.prop('industry').toProps().value,
        coreProducts: data.core_products ??  form.lens.prop('coreProducts').toProps().value,
      }      
      form.replaceValue(set)
    }).catch(
      r => {
        const errorText = r.cause?.body?.detail ?? r.message;
        showError(errorText)
      }
    );
  }

  return isLoading ? (<DataLoading/>) :
    <div className={css.root}>
      <ClientDefinitionTopBar onSave={handleSaveClientDefinition} onFillFormWithAI={handleFillClientDefinitionWithAI}/>
      <ClientDefinitionForm form={form}/>
    </div>;
}
