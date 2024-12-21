import { FormSaveResponse, UuiContexts, useUuiContext } from '@epam/uui-core';
import { SuccessNotification, Text, useForm } from '@epam/uui';

import { ClientProfileTopBar } from './components/ClientProfileTopBar';
import { IClientProfileInfo } from './ClientProfile.models';
import { defaultProfileData } from './constants';
import { profileValidationSchema } from './validation.schema';
import type { TApi } from '../../data';
import { ClientProfileForm } from './components/ClientProfileForm';
import DataLoading from '../../components/DataLoading';

import css from './ClientProfile.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loadProfileInfo, saveProfileInfo, selectIsDataLoading, selectProfile } from '../../store/data.slice';
import { useEffect } from 'react';

export function ClientProfileDetails() {
  const dispatch = useAppDispatch();
  const dataFromStore = useAppSelector(selectProfile);
  const isLoading = useAppSelector(selectIsDataLoading);

  useEffect(() => {
    dispatch(loadProfileInfo());
  }, [dispatch]);

  const svc = useUuiContext<TApi, UuiContexts>();
  const defaultFormData = dataFromStore ?? defaultProfileData;

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

  const form = useForm<IClientProfileInfo>({
    settingsKey: 'client-profile-form',
    value: defaultFormData,
    getMetadata: profileValidationSchema,
    beforeLeave: () => Promise.resolve(false),
    loadUnsavedChanges: () => Promise.resolve(),
    onSave: onSave,
    onSuccess: onSuccess
  });

  const handleSaveClientProfile = () => {
    // generateClientProfile
    form.save()
  }

  return isLoading ? (<DataLoading/>) :
    <div className={css.root}>
      <ClientProfileTopBar onSave={handleSaveClientProfile}/>
      <ClientProfileForm form={form}/>
    </div>;
}
