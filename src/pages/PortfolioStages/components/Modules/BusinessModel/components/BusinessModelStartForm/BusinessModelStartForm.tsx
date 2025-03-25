import { cx, FormSaveResponse, useArrayDataSource, useForm } from '@epam/uui-core';
import { FlexCell, FlexRow, LabeledInput, Panel, Button, Text, TextArea, Badge, IconContainer, PickerInput } from '@epam/uui';

import { businessModelStartFormValidationSchema } from './validation.schema';
import { ReactComponent as iconStart } from '@epam/assets/icons/navigation-chevron_right-outline.svg';
import { ReactComponent as iconInfo } from '@epam/assets/icons/content-interest-fill.svg';


import css from './BusinessModelStartForm.module.scss';

import { selectBusinessModelStartDetails, loadBusinessModelStartDetails, initBusinessModelCanvas } from '../../../../../../../store/ai.slice';
import { STATE_CODES } from '../../../../PortfolioStagesLeftPanel/structure';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import { isInvalidGeneratedResponse, useShowErrorNotification, useShowErrorRetryNotification } from '../../../../../../../utilities/notifications.utility';
import { getSuccessfullyCompletedModules, selectPortfolioDetails, selectValueCreationModels, setPending } from '../../../../../../../store/data.slice';
import { FORM_DEFAULT_DATA } from '../../../../../constants';
import { useEffect, useState } from 'react';
import { ScrollBars } from '@epam/uui-components';
import { IValueCreationModel, IBusinessModelStartDetails } from '../../../../../../../typings/models/business-model.models';

export interface IBusinessModelStartFormProps {
  stateCode: STATE_CODES
}

export default function BusinessModelStartForm({ stateCode }: IBusinessModelStartFormProps) {
  const valueCreationModels = useAppSelector(selectValueCreationModels);
  const modelsDataSource = useArrayDataSource<IValueCreationModel, string, unknown>({ items: valueCreationModels, getId: ({ name }) => name }, []);
  const [model, setModel] = useState<IValueCreationModel>(null);
  

  const dispatch = useAppDispatch();
  const selectedPortfolio = useAppSelector(selectPortfolioDetails);
  const selectedFormData = useAppSelector(selectBusinessModelStartDetails);

  useEffect(() => {
    dispatch(loadBusinessModelStartDetails({portfolio_id: selectedPortfolio.id} ));
  }, [dispatch, selectedPortfolio.id]);


  const { MODULE_TAGS, LABELS } = FORM_DEFAULT_DATA.find(x => x.id === stateCode);

  const defaultFormData: IBusinessModelStartDetails = {
    portfolioId: selectedPortfolio.id,
    valueCreationModelName: null,
    portfolioKeyPartners: selectedPortfolio.keyPartners
  }
  const fromData = selectedFormData ? selectedFormData : defaultFormData;
  
  const showErrorNotification = useShowErrorNotification();
  const showErrorRetryNotification = useShowErrorRetryNotification();
  

  const onSave = async (details: IBusinessModelStartDetails) => {

    const paramData: IBusinessModelStartDetails = {
      portfolioId: selectedPortfolio.id,
      valueCreationModelName: details.valueCreationModelName,
      portfolioKeyPartners: details.portfolioKeyPartners,
    }
  
    dispatch(setPending(true));
    try {
      const response = await dispatch(initBusinessModelCanvas(paramData)).unwrap();
      const result = { form: response.payload } as FormSaveResponse<IBusinessModelStartDetails>;

      await dispatch(getSuccessfullyCompletedModules(selectedPortfolio.id));

      return result;
    } catch (error) {
      const errorText = error?.cause?.body?.detail ?? error.message;
      if (isInvalidGeneratedResponse(errorText)) {
        showErrorRetryNotification(onClickSaveButton);
      } else {
        showErrorNotification(errorText);
      }
    } finally {
      dispatch(setPending(false));
    }
  };

  const onClickSaveButton = () => {
    form.save();
  }

  const form = useForm<IBusinessModelStartDetails>({
    settingsKey: 'business-model-start-form',
    value: fromData,
    beforeLeave: () => Promise.resolve(false),
    loadUnsavedChanges: () => Promise.reject(),
    getMetadata: businessModelStartFormValidationSchema,
    onSave: onSave,
  });
  form.canRedo = false;
  const { lens } = form;

 
  const hangleModelChange = (name: string) => {
    setModel(valueCreationModels.find(x => x.name === name));

    const set: React.SetStateAction<IBusinessModelStartDetails> = {
      portfolioId: selectedPortfolio.id,
      valueCreationModelName: name, 
      portfolioKeyPartners: form.lens.prop('portfolioKeyPartners').toProps().value,
    }
    form.replaceValue(set)
  }

  return (
    <div className={css.content}>
      <ScrollBars>
        <div className={css.rootForm}>
          <Panel cx={css.formPanel} background='surface-main' shadow>
            <FlexCell width='100%'>
              <h3 style={{ margin: '0px' }}>{LABELS.moduleTitle}</h3>
            </FlexCell>
            <FlexCell width='100%'>
              <Text cx={css.description}>{LABELS.moduleDescription} </Text>
            </FlexCell>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {
                MODULE_TAGS.map((tag, index) => (
                  <Badge key={index} color="neutral" fill="outline" caption={tag} />
                ))
              }
            </div>
            <FlexCell width='100%' cx={ cx(css.formContent) } >
              <FlexRow columnGap='12' cx={css.buttonPanel}>
                <h3 style={{ margin: '0px' }}>{LABELS.apiTitle}</h3>
              </FlexRow>
              <FlexRow>
                <LabeledInput htmlFor={'select-model'} label='Choose relevant model from the list' {...lens.prop('valueCreationModelName').toProps()}>
                  <PickerInput
                    {...lens.prop('valueCreationModelName').toProps()}
                    onValueChange={hangleModelChange}
                    dataSource={modelsDataSource}
                    selectionMode='single'
                    getName={(item) => item.name}
                    valueType='id'
                    id={'select-model'}
                    placeholder='Not selected'
                    editMode='dropdown'
                    disableClear={true}
                    isRequired={true}
                    searchPosition='none'
                    size='36'
                  />
                </LabeledInput>
              </FlexRow>

              {model && (
                <>
                  <FlexRow>
                    <h5 className={css.modelTitle}>DESCRIPTION</h5>
                  </FlexRow>
                  <FlexRow>
                    <Text cx={css.modelLabel} size='48'>{model.description}</Text>
                  </FlexRow>
                  <FlexRow>
                    <h5 className={css.modelTitle}>EXAMPLES</h5>
                  </FlexRow>
                  <FlexRow>
                    <Text cx={css.modelLabel} size='48'>{model.examples?.join(', ')}</Text>
                  </FlexRow>
                </>
              )}

              <FlexRow vPadding='12'>
                <FlexCell minWidth={550} width='100%'>
                  <LabeledInput htmlFor='keyPartners' label='Key Partners' {...lens.prop('portfolioKeyPartners').toProps()}>
                    <TextArea 
                      {...lens.prop('portfolioKeyPartners').toProps()} 
                      id='keyPartners' 
                      placeholder='Please type text'
                      rows={4}
                    />
                  </LabeledInput>
                </FlexCell>
              </FlexRow>

            </FlexCell>
            <FlexRow vPadding="12">
              <Button caption={LABELS.runButtonCaption} color="primary" icon={iconStart} iconPosition='right' onClick={form.save} />
            </FlexRow>
            <Panel cx={css.panelTip}>
              <FlexRow columnGap={8} alignItems='top'>
                <IconContainer icon={iconInfo} />
                <Text size="36"> {LABELS.tipMessage} </Text>
              </FlexRow>
            </Panel>
          </Panel>
        </div>
      </ScrollBars>
    </div>
  )
}