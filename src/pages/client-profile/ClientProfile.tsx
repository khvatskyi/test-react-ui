import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { FormSaveResponse, UuiContexts, useUuiContext } from '@epam/uui-core';
import { ErrorNotification, SuccessNotification, Text, useForm } from '@epam/uui';

import { ClientProfileTopBar } from './components/ClientProfileTopBar';
import { IClientProfileInfo, IExtendedClientProfileInfo } from './ClientProfile.models';
import { defaultProfileData } from './constants';
import { profileValidationSchema } from './validation.schema';
import type { TApi } from '../../data';
import { ClientProfileForm } from './components/ClientProfileForm';
import DataLoading from '../../components/DataLoading';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loadProfileInfo, saveClientDefinitionInfo, saveProfileInfo, selectIsDataLoading, selectProfile } from '../../store/data.slice';

import css from './ClientProfile.module.scss';
import { IAiClientDefinitionFillRequest } from '../../models/ai.models';
import { sendClientDefinitionFillMessage } from '../../services/ai.service';
import { ItemList } from './components/ItemList';

export function ClientProfileDetails() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const dataFromStore = useAppSelector(selectProfile);
  // const dataFromStore = null;
  const isLoading = useAppSelector(selectIsDataLoading);

  useEffect(() => {
    dispatch(loadProfileInfo());
  }, [dispatch]);

  const svc = useUuiContext<TApi, UuiContexts>();
  const defaultFormData = dataFromStore ?? defaultProfileData;
  const isExtendedMode = Boolean(dataFromStore);

  const onSaveInitialData = (state: IClientProfileInfo) => {
    return dispatch(saveClientDefinitionInfo(state))
      .then(x => ({ form: x.payload as IClientProfileInfo } as FormSaveResponse<IClientProfileInfo>));
  }

  const onSave = (state: IExtendedClientProfileInfo) => {
    return dispatch(saveProfileInfo(state))
      .then(x => ({ form: x.payload as IExtendedClientProfileInfo } as FormSaveResponse<IExtendedClientProfileInfo>));
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
      const set: React.SetStateAction<IClientProfileInfo> = {
        name: data.name ?? form.lens.prop('name').toProps().value,
        size: data.size ?? form.lens.prop('size').toProps().value,
        description: data.description ?? form.lens.prop('description').toProps().value,
        industry: data.industry ?? form.lens.prop('industry').toProps().value,
        coreProducts: data.coreProducts ?? form.lens.prop('coreProducts').toProps().value,
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
      onSave: onSaveInitialData,
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

  const handleSaveClientProfile = () => {
    // generateClientProfile
    form.save()
  }

  // return <ItemList form={form} controlName='strengths' />;

  return isLoading ? (<DataLoading />) :
    <div className={css.root}>
      <ClientProfileTopBar isExtendedMode={isExtendedMode}
        onFillFormWithAI={handleFillClientDefinitionWithAI}
        onSave={form.save}
        disableButtons={isLoading} />
      <ClientProfileForm form={form}
        isExtendedForm={isExtendedMode} />
    </div>;
}
