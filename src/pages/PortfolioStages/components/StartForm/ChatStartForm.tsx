import { cx, FormSaveResponse, useForm } from '@epam/uui-core';
import { FlexCell, FlexRow, LabeledInput, Panel, Button, Text, TextArea, TextInput, Badge, IconContainer } from '@epam/uui';

import { apiContextValidationSchema } from './validation.schema';
import { ReactComponent as iconStart } from '@epam/assets/icons/navigation-chevron_right-outline.svg';
import { ReactComponent as iconInfo } from '@epam/assets/icons/content-interest-fill.svg';


import css from './ChatStartForm.module.scss';

import { loadApiContext, selectApiContext, initNewChatTopics, startNewChat, setChatTopic, resetChatContext } from '../../../../store/ai.slice';
import { getStateTitle, multiTopicChats, STATE_CODES } from '../PortfolioStagesLeftPanel/structure';
import { IApiContext, IStartChat, IInteractiveChatContext } from '../../../../typings/models/module.models';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { isInvalidGeneratedResponse, useShowErrorNotification, useShowErrorRetryNotification } from '../../../../utilities/notifications.utility';
import { getSuccessfullyCompletedModules, selectPortfolioDetails, setPending } from '../../../../store/data.slice';
import { FORM_DEFAULT_DATA } from '../../constants';
import { useEffect } from 'react';
import { ScrollBars } from '@epam/uui-components';
import { initGoalsAndKPIs } from '../../../../store/goals-and-kpis.slice';

export interface IChatStartFormProps {
  stateCode: STATE_CODES
}

export default function ChatStartForm({ stateCode }: IChatStartFormProps) {
  const dispatch = useAppDispatch();
  const selectedPortfolio = useAppSelector(selectPortfolioDetails);
  const apiContext = useAppSelector(selectApiContext);

  useEffect(() => {
    dispatch(loadApiContext( {portfolio_id: selectedPortfolio.id} ));
  }, [dispatch, selectedPortfolio.id, stateCode]);


  const { MODULE_TAGS, LABELS, DEFAULT_API_CONTEXT_DATA } = FORM_DEFAULT_DATA.find(x => x.id === stateCode);
  const fromData = apiContext ? apiContext : DEFAULT_API_CONTEXT_DATA;
  const showErrorNotification = useShowErrorNotification();
  const showErrorRetryNotification = useShowErrorRetryNotification();
  
  const disableEditors = apiContext ? (stateCode === STATE_CODES.ValueProposition ? false : true) : false;
  
  const onSave = async (state: IApiContext) => {
  
    dispatch(setPending(true));
    try {
      if (stateCode === STATE_CODES.GoalsAndKPIs) {
        /*const response = */ await dispatch(initGoalsAndKPIs({ portfolio_id: selectedPortfolio.id })).unwrap();
        const result = { form: state } as FormSaveResponse<IApiContext>;

        await dispatch(getSuccessfullyCompletedModules(selectedPortfolio.id));
        return result;
      } else {
        const formData = { ...state, portfolioId: selectedPortfolio.id, stateCode: stateCode };
        const response = await dispatch(initNewChatTopics(formData));
        const result = { form: response.payload } as FormSaveResponse<IApiContext>;
        
        if (!multiTopicChats.includes(stateCode)) { //If it is a single topic chat, then start a conversation
          const context: IStartChat = {
            portfolioId: selectedPortfolio.id,
            stateCode: stateCode,
            topic: getStateTitle(stateCode)
          }
          await dispatch(startNewChat(context)).unwrap();
          dispatch(setChatTopic(context.topic));
        }
        return result;
      }

    } catch (error) {
      const errorText = error?.cause?.body?.detail ?? error.message;
      if (isInvalidGeneratedResponse(errorText)) {
        await dispatch(resetChatContext({ portfolioId: selectedPortfolio.id, stateCode: stateCode }));
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

  const form = useForm<IApiContext>({
    settingsKey: 'chat-start-form',
    value: fromData,
    beforeLeave: () => Promise.resolve(false),
    loadUnsavedChanges: () => Promise.reject(),
    getMetadata: apiContextValidationSchema,
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
            <FlexCell width='100%' cx={ cx(css.formContent) }  >
              <h3 style={{ margin: '0px' }}>{LABELS.apiTitle}</h3>
              <FlexRow vPadding='12'>
                <FlexCell minWidth={550} width='100%'>
                  <LabeledInput htmlFor='chatStartName' label='API product name'  {...lens.prop('name').toProps()}>
                    <TextInput {...lens.prop('name').toProps()} id='chatStartName' placeholder='Please type text' maxLength={72} isDisabled={disableEditors}/>
                  </LabeledInput>
                  <Text cx={css.inputHint}>The name for an API collection designed to deliver a product</Text>
                </FlexCell>
              </FlexRow>
              <FlexRow vPadding='12'>
                <FlexCell minWidth={550} width='100%'>
                  <LabeledInput htmlFor='chatStartDescription' label='Description' {...lens.prop('description').toProps()}>
                    <TextArea {...lens.prop('description').toProps()} id='chatStartDescription' rows={4} placeholder='Please type text' isDisabled={disableEditors} />
                  </LabeledInput>
                  <Text cx={css.inputHint}>A brief description of the API product purpose</Text>
                </FlexCell>
              </FlexRow>
            </FlexCell>
            <FlexRow vPadding="12">
              <Button caption={LABELS.runButtonCaption} color="primary" icon={iconStart} iconPosition='right' onClick={form.save} />
            </FlexRow>
            <Panel cx={css.panelTip}>
              <FlexRow columnGap={8} alignItems='top'>
                <IconContainer icon={iconInfo} />
                <Text size="36">{LABELS.tipMessage} </Text>
              </FlexRow>
            </Panel>
          </Panel>
        </div>
      </ScrollBars>
    </div>
    )
}