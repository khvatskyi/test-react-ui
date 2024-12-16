import { FormSaveResponse, UuiContexts, useUuiContext } from '@epam/uui-core';
import { SuccessNotification, Text, useForm } from '@epam/uui';

import { ProfileTopBar } from './components/ProfileTopBar';
import { IProfileInfo } from './Profile.models';
import { defaultProfileData } from './constants';
import { profileValidationSchema } from './validation.schema';
import type { TApi } from '../../data';
import { ProfileForm } from './components/ProfileForm';
import css from './Profile.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loadProfileInfo, saveProfileInfo, selectIsDataLoading, selectProfile } from '../../store/data.slice';
import { useEffect } from 'react';

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

  const form = useForm<IProfileInfo>({
    settingsKey: 'profile-form',
    value: defaultFormData,
    getMetadata: profileValidationSchema,
    onSave: onSave,
    onSuccess: onSuccess
  });

  return isLoading ? (<div>Loading...</div>) :
    <div className={css.root}>
      <ProfileTopBar save={form.save} />
      <ProfileForm form={form} defaultData={defaultFormData} />
    </div>;
}
