import { FormSaveResponse, UuiContexts, useUuiContext } from '@epam/uui-core';
import { SuccessNotification, ErrorNotification, Text, useForm } from '@epam/uui';

import { ProfileTopBar } from './components/ProfileTopBar';
import { IProfileInfo } from './Profile.models';
import { defaultProfileData } from './constants';
import { profileValidationSchema } from './validation.schema';
import type { TApi } from '../../data';
import { ProfileForm } from './components/ProfileForm';
import DataLoading from '../../components/DataLoading';

import css from './Profile.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loadProfileInfo, saveProfileInfo, selectIsDataLoading, selectProfile } from '../../store/data.slice';
import { useEffect } from 'react';
import { IAiProfileFillRequest } from '../../models/ai.models';
import { sendProfileFillMessage } from '../../services/ai.service';

export function ProfileDetails() {
  const dispatch = useAppDispatch();
  const dataFromStore = useAppSelector(selectProfile);
  const isLoading = useAppSelector(selectIsDataLoading);

  useEffect(() => {
    dispatch(loadProfileInfo());
  }, [dispatch]);

  const svc = useUuiContext<TApi, UuiContexts>();
  const defaultFormData = dataFromStore ?? defaultProfileData;

  const onSave = (state: IProfileInfo) => {
    return dispatch(saveProfileInfo(state))
      .then(x => ({ form: x.payload as IProfileInfo } as FormSaveResponse<IProfileInfo>));
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


  const form = useForm<IProfileInfo>({
    settingsKey: 'profile-form',
    value: defaultFormData,
    getMetadata: profileValidationSchema,
    beforeLeave: () => Promise.resolve(false),
    loadUnsavedChanges: () => Promise.resolve(),
    onSave: onSave,
    onSuccess: onSuccess
  });

  const handleSaveClientDefinition = () => {
    // generateClientProfile
    form.save()
  }

  const handleFillProfileWithAI = () => {
    const name = form.lens.prop('name').toProps().value
    const requestMessage: IAiProfileFillRequest = {
      name: name
    };

    sendProfileFillMessage(requestMessage).then(data => {
      const set: React.SetStateAction<IProfileInfo> = {
        name: data.name ??  form.lens.prop('name').toProps().value,
        size: data.size ??  form.lens.prop('size').toProps().value,
        description: data.description ?? form.lens.prop('description').toProps().value,
        industry: data.industry ??  form.lens.prop('industry').toProps().value,
        coreProducts: data.coreProducts ??  form.lens.prop('coreProducts').toProps().value,
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
      <ProfileTopBar onSave={handleSaveClientDefinition} onFillProfileWithAI={handleFillProfileWithAI}/>
      <ProfileForm form={form}/>
    </div>;
}
