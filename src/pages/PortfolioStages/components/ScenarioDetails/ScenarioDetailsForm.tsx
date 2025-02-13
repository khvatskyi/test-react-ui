import { cx, FormSaveResponse, useForm } from '@epam/uui-core';
import { FlexCell, FlexRow, LabeledInput, Panel, Button, Text, TextArea, TextInput, Badge, IconContainer } from '@epam/uui';

import { scenarioDetailsValidationSchema } from './validation.schema';
import { ReactComponent as iconStart } from '@epam/assets/icons/navigation-chevron_right-outline.svg';
import { ReactComponent as iconInfo } from '@epam/assets/icons/content-interest-fill.svg';
import { ReactComponent as iconAI } from '@epam/assets/icons/ai-copilot_magic_small-fill.svg';


import css from './ScenarioDetailsForm.module.scss';

import { loadScenarioDetails, selectScenarioDetails, initApiProductJourney } from '../../../../store/ai.slice';
import { STATE_CODES } from '../PortfolioStagesLeftPanel/structure';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useShowErrorNotification } from '../../../../utilities/notifications.utility';
import { getSuccessfullyCompletedModules, selectPortfolioDetails, setPending } from '../../../../store/data.slice';
import { FORM_DEFAULT_DATA } from '../../constants';
import { useEffect } from 'react';
import { FlexSpacer, ScrollBars } from '@epam/uui-components';
import { IGetScenarioDetailsRequest, IScenarioDetails } from '../../../../typings/models/product-journey.model';
import { sendScenarioDetailsMessage } from '../../../../services/chat.service';

export interface IScenarioDetailsFormProps {
  stateCode: STATE_CODES
}

export default function ScenarioDetailsForm({ stateCode }: IScenarioDetailsFormProps) {
  const dispatch = useAppDispatch();
  const selectedPortfolio = useAppSelector(selectPortfolioDetails);
  const scenarioDetails = useAppSelector(selectScenarioDetails);

  useEffect(() => {
    const request: IGetScenarioDetailsRequest = {
      portfolio_id: selectedPortfolio.id,
    };
    dispatch(loadScenarioDetails(request));
  }, [dispatch, selectedPortfolio.id, stateCode]);


  const { MODULE_TAGS, LABELS, DEFAULT_API_CONTEXT_DATA } = FORM_DEFAULT_DATA.find(x => x.id === stateCode);
  const fromData = scenarioDetails ? scenarioDetails : DEFAULT_API_CONTEXT_DATA;
  
  const showErrorNotification = useShowErrorNotification();
  
  const onSave = async (details: IScenarioDetails) => {

    const formData: IScenarioDetails = {
      portfolioId: selectedPortfolio.id,
      name: form.lens.prop('name').toProps().value,
      description: form.lens.prop('description').toProps().value,
      context: form.lens.prop('context').toProps().value,
    }
  
    dispatch(setPending(true));
    try {
      const response = await dispatch(initApiProductJourney(formData));
      const result = { form: response.payload } as FormSaveResponse<IScenarioDetails>;

      await dispatch(getSuccessfullyCompletedModules(selectedPortfolio.id));

      return result;
    } catch (error) {
      const errorText = error?.cause?.body?.detail ?? error.message;
      showErrorNotification(errorText);
    } finally {
      dispatch(setPending(false));
    }
  };


  const onFillFormWithAI = () => {
    dispatch(setPending(true));
    sendScenarioDetailsMessage(selectedPortfolio.id).then(data => {
      const set: React.SetStateAction<IScenarioDetails> = {
        portfolioId: selectedPortfolio.id,
        name: data.name ?? form.lens.prop('name').toProps().value,
        description: data.description ?? form.lens.prop('description').toProps().value,
        context: data.context ?? form.lens.prop('context').toProps().value,
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


  const form = useForm<IScenarioDetails>({
    settingsKey: 'chat-start-form',
    value: fromData,
    beforeLeave: () => Promise.resolve(false),
    loadUnsavedChanges: () => Promise.resolve(),
    getMetadata: scenarioDetailsValidationSchema,
    onSave: onSave,
  });
  form.canRedo = false;
  const { lens } = form;

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
                <FlexSpacer />
                <Button caption='Fill with AI' icon={iconAI} fill='ghost' onClick={onFillFormWithAI} />
              </FlexRow>

              <FlexRow vPadding='12'>
                <FlexCell minWidth={550} width='100%'>
                  <LabeledInput htmlFor='scenarioDetailsName' label='Name'  {...lens.prop('name').toProps()}>
                    <TextInput {...lens.prop('name').toProps()} id='scenarioDetailsName' placeholder='Please type text' maxLength={72} />
                  </LabeledInput>
                  <Text cx={css.inputHint}>The scenario in which a user or system needs to interact with the API</Text>
                </FlexCell>
              </FlexRow>
              <FlexRow vPadding='12'>
                <FlexCell minWidth={550} width='100%'>
                  <LabeledInput htmlFor='scenarioDetailsDescription' label='Description' {...lens.prop('description').toProps()}>
                    <TextArea {...lens.prop('description').toProps()} id='scenarioDetailsDescription' rows={4} placeholder='Please type text' />
                  </LabeledInput>
                  <Text cx={css.inputHint}>Detailed description of the scenario, including context and purpose</Text>
                </FlexCell>
              </FlexRow>
              <FlexRow vPadding='12'>
                <FlexCell minWidth={550} width='100%'>
                  <LabeledInput htmlFor='scenarioDetailsContext' label='Context' {...lens.prop('context').toProps()}>
                    <TextArea {...lens.prop('context').toProps()} id='scenarioDetailsContext' rows={4} placeholder='Please type text' />
                  </LabeledInput>
                  <Text cx={css.inputHint}>Additional background or environmental details for the scenario, if applicable</Text>
                </FlexCell>
              </FlexRow>
            </FlexCell>
            <FlexRow vPadding="12">
              <Button caption="Create API product journey" color="primary" icon={iconStart} iconPosition='right' onClick={form.save} />
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