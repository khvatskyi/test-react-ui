import { UuiContexts, useUuiContext } from '@epam/uui-core';
import { SuccessNotification, Text, useForm } from '@epam/uui';

import { ProfileTopBar } from './components/ProfileTopBar';
import { IProfileInfo } from './Profile.models';
import { defaultProfileData } from './constants';
import { profileValidationSchema } from './validation.schema';
import type { TApi } from '../../data';
import { ProfileForm } from './components/ProfileForm';
import css from './Profile.module.scss';

export function ProfileDetails() {
  const svc = useUuiContext<TApi, UuiContexts>();
  const dataFromStore = null;
  const defaultFormData = dataFromStore ?? defaultProfileData;

  const onSave = (state: IProfileInfo) => {
    return new Promise<void>(() => {});
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
    settingsKey: 'provider-context-form',
    value: defaultFormData,
    getMetadata: profileValidationSchema,
    onSave: onSave,
    onSuccess: onSuccess
  });

  return (
    <div className={css.root}>
      <ProfileTopBar save={form.save} />
      <ProfileForm form={form} defaultData={defaultFormData} />
    </div>
  );
}
