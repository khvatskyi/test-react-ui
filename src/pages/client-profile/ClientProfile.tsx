import { useEffect } from 'react';

import { FormSaveResponse, UuiContexts, useUuiContext } from '@epam/uui-core';
import { ErrorNotification, SuccessNotification, Text, useForm } from '@epam/uui';

import { ClientProfileTopBar } from './components/ClientProfileTopBar';
import { IClientDefinitionInfo, IClientProfileInfo } from './ClientProfile.models';
import { defaultProfileData } from './constants';
import { profileValidationSchema } from './validation.schema';
import type { TApi } from '../../data';
import { ClientProfileForm } from './components/ClientProfileForm';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { clearClientProfile, loadProfileInfo, saveClientDefinitionInfo, saveProfileInfo, selectClientDefinition, selectIsDataLoading, selectProfile } from '../../store/data.slice';
import { sendClientDefinitionFillMessage } from '../../services/ai.service';
import { IAiClientDefinitionFillRequest } from '../../models/ai.models';
import { setClientDefinitionInfo } from '../../store/data.slice'

import css from './ClientProfile.module.scss';

export function ClientProfileDetails() {
  const dispatch = useAppDispatch();
  const dataFromStore = useAppSelector(selectProfile);
  const clientDefinitionFromStore = useAppSelector(selectClientDefinition);
  // const dataFromStore = null;
  const isLoading = useAppSelector(selectIsDataLoading);

  useEffect(() => {
    dispatch(loadProfileInfo());
  }, [dispatch]);

  const svc = useUuiContext<TApi, UuiContexts>();
  const defaultFormData = dataFromStore ?? clientDefinitionFromStore ?? defaultProfileData;
  const isExtendedMode = Boolean(dataFromStore);

  const onSaveDefinitionData = (state: IClientDefinitionInfo) => {
    return dispatch(saveClientDefinitionInfo(state))
      .then(x => ({ form: x.payload as IClientDefinitionInfo } as FormSaveResponse<IClientDefinitionInfo>))
      .catch(
      r => {
        const errorText = r.cause?.body?.detail ?? r.message;
        showError(errorText)
      }
    );
  }

  const onSave = (state: IClientProfileInfo) => {
    return dispatch(saveProfileInfo(state))
      .then(x => ({ form: x.payload as IClientProfileInfo } as FormSaveResponse<IClientProfileInfo>));
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

  const handleFillClientDefinitionWithAI = () => {
    const name = form.lens.prop('name').toProps().value
    const requestMessage: IAiClientDefinitionFillRequest = {
      name: name
    };

    sendClientDefinitionFillMessage(requestMessage).then(data => {
      const set: React.SetStateAction<IClientDefinitionInfo> = {
        name: data.name ?? form.lens.prop('name').toProps().value,
        size: data.size ?? form.lens.prop('size').toProps().value,
        description: data.description ?? form.lens.prop('description').toProps().value,
        industry: data.industry ?? form.lens.prop('industry').toProps().value,
        coreProducts: data.core_products ?? form.lens.prop('coreProducts').toProps().value,
      }
      form.replaceValue(set)
    }).catch(
      r => {
        const errorText = r.cause?.body?.detail ?? r.message;
        showError(errorText)
      }
    );
  }

  const formConfiguration = !isExtendedMode
    ? {
      settingsKey: 'client-profile-form',
      value: defaultFormData,
      getMetadata: profileValidationSchema,
      beforeLeave: () => Promise.resolve(false),
      loadUnsavedChanges: () => Promise.resolve(),
      onSave: onSaveDefinitionData,
      onSuccess: onSuccess
    }
    : {
      settingsKey: 'extended-client-profile-form',
      value: defaultFormData,
      getMetadata: profileValidationSchema,
      beforeLeave: () => Promise.resolve(false),
      loadUnsavedChanges: () => Promise.resolve(),
      onSave: onSave,
      onSuccess: onSuccess
    };

  const form = useForm(formConfiguration);

  const handleEditClientDefinition = () => {

    const clientDefinition: IClientDefinitionInfo = {
      name: form.value.name,
      description: form.value.description,
      industry: form.value.industry,
      size: form.value.size,
      coreProducts: form.value.coreProducts
    }

    dispatch(setClientDefinitionInfo(clientDefinition));
    dispatch(clearClientProfile());
  };

  return (
    <div className={css.root}>
      <ClientProfileTopBar isExtendedMode={isExtendedMode}
        onFillFormWithAI={handleFillClientDefinitionWithAI}
        onSave={form.save}
        disableButtons={isLoading} />
      <ClientProfileForm form={form}
        isExtendedForm={isExtendedMode}
        onEditClientDefinition={handleEditClientDefinition} />
    </div>
  );
}
