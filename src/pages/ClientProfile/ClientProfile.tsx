import { useCallback, useEffect, useState } from 'react';

import { FormSaveResponse, useUuiContext } from '@epam/uui-core';
import { ScrollBars, useForm } from '@epam/uui';

import css from './ClientProfile.module.scss';
import { ClientProfileTopBar, ClientProfileForm } from './components';
import { IClientDefinitionInfo, IClientProfileInfo } from '../../typings/models/client-info.models';
import { getClientProfileValidationSchema } from './validation.schema';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { clearClientProfile, loadProfileInfo, saveClientDefinitionInfo, saveProfileInfo, selectClientDefinition, selectIsDataLoading, selectProfile, setPending } from '../../store/data.slice';
import { sendClientDefinitionFillMessage } from '../../services/ai.service';
import { IAiClientDefinitionFillRequest } from '../../typings/models/ai.models';
import { setClientDefinitionInfo } from '../../store/data.slice';
import { industries as defaultIndustries } from '../../constants';
import { ERROR_MESSAGES, isInvalidGeneratedResponse, useShowErrorNotification, useShowErrorRetryNotification, useShowSuccessNotification } from '../../utilities/notifications.utility';
import { useHistory } from 'react-router-dom';
import { LeavePageConfirmation } from '../../components/LeavePageConfirmation/LeavePageConfirmation';

const DEFAULT_PROFILE_DATA: IClientDefinitionInfo = {
  name: null,
  description: null,
  industry: null,
  size: 'Large',
} as const;

export default function ClientProfile() {
  const dispatch = useAppDispatch();
  const { uuiModals } = useUuiContext();
  const dataFromStore = useAppSelector(selectProfile);
  const clientDefinitionFromStore = useAppSelector(selectClientDefinition);
  const isLoading = useAppSelector(selectIsDataLoading);

  useEffect(() => {
    dispatch(loadProfileInfo());
  }, [dispatch]);

  const [clickedSaveButtonClientProfile, setClickedSaveButtonClientProfile] = useState(false);

  const defaultFormData = dataFromStore ?? clientDefinitionFromStore ?? DEFAULT_PROFILE_DATA;
  const isExtendedMode = Boolean(dataFromStore);
  const industries = structuredClone(defaultIndustries);

  if (defaultFormData?.industry && industries.every(x => x.industry.toUpperCase() !== defaultFormData.industry.toUpperCase())) {
    industries.push({ id: defaultFormData.industry, industry: defaultFormData.industry });
  }

  const showErrorNotification = useShowErrorNotification();
  const showErrorRetryNotification = useShowErrorRetryNotification()
  const showSuccessNotification = useShowSuccessNotification();


  const onSaveDefinitionData = async (state: IClientDefinitionInfo) => {
    try {
      const response = await dispatch(saveClientDefinitionInfo(state)).unwrap();
      return { form: response as IClientDefinitionInfo } as FormSaveResponse<IClientDefinitionInfo>;
    } catch (error) {
      const errorText = error?.cause?.body?.detail ?? error.message;
      if (isInvalidGeneratedResponse(errorText)) {
        showErrorRetryNotification(onClickSaveButtonClientDefinition);
      } else {
        showErrorNotification(errorText);
      }
    }
  };


  const handleFillClientDefinitionWithAI = () => {
    const name = form.lens.prop('name').toProps().value
    const requestMessage: IAiClientDefinitionFillRequest = {
      name: name
    };

    dispatch(setPending(true));
    sendClientDefinitionFillMessage(requestMessage)
    .then(
      data => {
        const set: React.SetStateAction<IClientDefinitionInfo> = {
          name: data.name ?? form.lens.prop('name').toProps().value,
          size: data.size ?? form.lens.prop('size').toProps().value,
          description: data.description ?? form.lens.prop('description').toProps().value,
          industry: data.industry ?? form.lens.prop('industry').toProps().value,
          coreProducts: data.core_products ?? form.lens.prop('coreProducts').toProps().value,
        }
        form.replaceValue(set)
        dispatch(setPending(false));
      }
    )
    .catch(
      r => {
        dispatch(setPending(false));
        const errorText = r.cause?.body?.detail ?? r.message;
        if (isInvalidGeneratedResponse(errorText)) {
          showErrorRetryNotification(handleFillClientDefinitionWithAI);
        } else {
          showErrorNotification(errorText);
        }
      }
    );
  }

  const onSaveClientProfile = (state: IClientProfileInfo) => {
    return dispatch(saveProfileInfo(state))
      .then(x => ({ form: x.payload as IClientProfileInfo } as FormSaveResponse<IClientProfileInfo>));
  }

  const onSuccessDefinition = () => {
    showSuccessNotification('Data has been saved!')
  }

  const history = useHistory();
  const onSuccessClientProfile = () => {
    if (clickedSaveButtonClientProfile) {
      history.push('/portfolios');
    }
  }

  const beforeLeave = useCallback((): Promise<boolean> => {
      const result = uuiModals.show<boolean>((modalProps) => <LeavePageConfirmation { ...modalProps } />);
      return result;
  }, [uuiModals]);

  const formConfiguration = !isExtendedMode
    ? {
      settingsKey: 'client-profile-form',
      value: defaultFormData,
      getMetadata: getClientProfileValidationSchema,
      beforeLeave: beforeLeave,
      loadUnsavedChanges: () => Promise.reject(),
      onSave: onSaveDefinitionData,
      onSuccess: onSuccessDefinition
    }
    : {
      settingsKey: 'extended-client-profile-form',
      value: defaultFormData,
      getMetadata: getClientProfileValidationSchema,
      beforeLeave: beforeLeave,
      loadUnsavedChanges: () => Promise.reject(),
      onSave: onSaveClientProfile,
      onSuccess: onSuccessClientProfile
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

  const onClickSaveButtonClientDefinition = () => {
    form.save();
  }

  const onClickSaveButtonClientProfile = () => {
    form.save();
    setClickedSaveButtonClientProfile(true);
  }

  const onCancel = () => {
    return new Promise<void>(() => {
      form.revert();
      history.push('/portfolios');
    });
  }


  const onClickSaveButton = isExtendedMode ? onClickSaveButtonClientProfile : onClickSaveButtonClientDefinition


  return (
    <div className={css.root}>
      <ClientProfileTopBar
        isExtendedMode={isExtendedMode}
        onFillFormWithAI={handleFillClientDefinitionWithAI}
        onSave={onClickSaveButton}
        disableButtons={isLoading}
        onCancel={onCancel} 
        />
      <div className={ css.content }>
        <ScrollBars>
          <ClientProfileForm form={form}
            isExtendedForm={isExtendedMode}
            industries={industries}
            onEditClientDefinition={handleEditClientDefinition} />
        </ScrollBars>
      </div>
    </div>
  );
}
