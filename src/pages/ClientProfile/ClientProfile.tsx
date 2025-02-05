import { useEffect, useState } from 'react';

import { FormSaveResponse } from '@epam/uui-core';
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
import { useShowErrorNotification, useShowSuccessNotification } from '../../utilities/notifications.utility';
import { useHistory } from 'react-router-dom';

const DEFAULT_PROFILE_DATA: IClientDefinitionInfo = {
  name: '',
  description: '',
  industry: '',
  size: 'Large',
} as const;

export default function ClientProfile() {
  const dispatch = useAppDispatch();
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
  const showSuccessNotification = useShowSuccessNotification();

  const onSaveDefinitionData = (state: IClientDefinitionInfo) => {
    return dispatch(saveClientDefinitionInfo(state))
      .then(x => ({ form: x.payload as IClientDefinitionInfo } as FormSaveResponse<IClientDefinitionInfo>))
      .catch(
      r => {
        const errorText = r.cause?.body?.detail ?? r.message;
        showErrorNotification(errorText)
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

  const handleFillClientDefinitionWithAI = () => {
    const name = form.lens.prop('name').toProps().value
    const requestMessage: IAiClientDefinitionFillRequest = {
      name: name
    };

    dispatch(setPending(true));
    sendClientDefinitionFillMessage(requestMessage).then(data => {
      const set: React.SetStateAction<IClientDefinitionInfo> = {
        name: data.name ?? form.lens.prop('name').toProps().value,
        size: data.size ?? form.lens.prop('size').toProps().value,
        description: data.description ?? form.lens.prop('description').toProps().value,
        industry: data.industry ?? form.lens.prop('industry').toProps().value,
        coreProducts: data.core_products ?? form.lens.prop('coreProducts').toProps().value,
      }
      form.replaceValue(set)
      dispatch(setPending(false));
    }).catch(
      r => {
        dispatch(setPending(false));
        const errorText = r.cause?.body?.detail ?? r.message;
        showErrorNotification(errorText)
      }
    );
  }

  const formConfiguration = !isExtendedMode
    ? {
      settingsKey: 'client-profile-form',
      value: defaultFormData,
      getMetadata: getClientProfileValidationSchema,
      beforeLeave: () => Promise.resolve(false),
      loadUnsavedChanges: () => Promise.resolve(),
      onSave: onSaveDefinitionData,
      onSuccess: onSuccessDefinition
    }
    : {
      settingsKey: 'extended-client-profile-form',
      value: defaultFormData,
      getMetadata: getClientProfileValidationSchema,
      beforeLeave: () => Promise.resolve(false),
      loadUnsavedChanges: () => Promise.resolve(),
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

  const formIsChanged = () => {
    return form.isChanged;
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
        formIsChanged={formIsChanged}         
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
