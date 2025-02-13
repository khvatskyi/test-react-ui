import { cx, FormSaveResponse, useForm } from '@epam/uui-core';
import { FlexCell, FlexRow, LabeledInput, Panel, Button, Text, TextArea, TextInput, Badge, IconContainer } from '@epam/uui';

import { apiContextValidationSchema } from './validation.schema';
import { ReactComponent as iconStart } from '@epam/assets/icons/navigation-chevron_right-outline.svg';
import { ReactComponent as iconInfo } from '@epam/assets/icons/content-interest-fill.svg';


import css from './ChatStartForm.module.scss';

import { loadApiContext, selectApiContext, initNewChatTopics, startNewChat, setChatTopic } from '../../../../store/ai.slice';
import { getStateTitle, STATE_CODES } from '../PortfolioStagesLeftPanel/structure';
import { IGetApiContextRequest, IApiContext, IStartChat, IInteractiveChatContext } from '../../../../typings/models/module.models';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useShowErrorNotification } from '../../../../utilities/notifications.utility';
import { selectPortfolioDetails, setPending } from '../../../../store/data.slice';
import { FORM_DEFAULT_DATA } from '../../constants';
import { useEffect } from 'react';
import { ScrollBars } from '@epam/uui-components';

export interface IChatStartFormProps {
  stateCode: STATE_CODES
}

export default function ChatStartForm({ stateCode }: IChatStartFormProps) {
  const dispatch = useAppDispatch();
  const selectedPortfolio = useAppSelector(selectPortfolioDetails);
  const apiContext = useAppSelector(selectApiContext);

  useEffect(() => {
    const request: IGetApiContextRequest = {
      portfolio_id: selectedPortfolio.id,
    };
    dispatch(loadApiContext(request));
  }, [dispatch, selectedPortfolio.id, stateCode]);


  const { MODULE_TAGS, LABELS, DEFAULT_API_CONTEXT_DATA } = FORM_DEFAULT_DATA.find(x => x.id === stateCode);
  const fromData = apiContext ? apiContext : DEFAULT_API_CONTEXT_DATA;
  const showErrorNotification = useShowErrorNotification();
  const disableEditors = apiContext ? (stateCode === STATE_CODES.ValueProposition ? false : true) : false;
  
  const onSave = async (state: IApiContext) => {
    const modifiedState = { ...state, portfolioId: selectedPortfolio.id, stateCode: stateCode };
  
    dispatch(setPending(true));
    try {
      const response = await dispatch(initNewChatTopics({ context: modifiedState}));
      const result = { form: response.payload } as FormSaveResponse<IApiContext>;
      const topics = (response.payload as IInteractiveChatContext).topics
      
      if (topics?.length === 1) { //If a chat has one topic, then start a conversation
        const context: IStartChat = {
          portfolioId: selectedPortfolio.id,
          stateCode: stateCode,
          topic: getStateTitle(stateCode)
        }
        dispatch(startNewChat(context));
        dispatch(setChatTopic(context.topic));
      }

      return result;
    } catch (error) {
      const errorText = error?.cause?.body?.detail ?? error.message;
      showErrorNotification(errorText);
    } finally {
      dispatch(setPending(false));
    }
  };


  const form = useForm<IApiContext>({
    settingsKey: 'chat-start-form',
    value: fromData,
    beforeLeave: () => Promise.resolve(false),
    loadUnsavedChanges: () => Promise.resolve(),
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
                  <LabeledInput htmlFor='chatStartName' label='API name'  {...lens.prop('name').toProps()}>
                    <TextInput {...lens.prop('name').toProps()} id='chatStartName' placeholder='Please type text' maxLength={72} isDisabled={disableEditors}/>
                  </LabeledInput>
                </FlexCell>
              </FlexRow>
              <FlexRow vPadding='12'>
                <FlexCell minWidth={550} width='100%'>
                  <LabeledInput htmlFor='chatStartDescription' label='Description' {...lens.prop('description').toProps()}>
                    <TextArea {...lens.prop('description').toProps()} id='chatStartDescription' rows={4} placeholder='Please type text' isDisabled={disableEditors} />
                  </LabeledInput>
                </FlexCell>
              </FlexRow>
            </FlexCell>
            <FlexRow vPadding="12">
              <Button caption="Start chat" color="primary" icon={iconStart} iconPosition='right' onClick={form.save} />
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