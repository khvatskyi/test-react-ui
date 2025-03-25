import { cx, FormSaveResponse, useForm } from '@epam/uui-core';
import { FlexCell, FlexRow, LabeledInput, Panel, Button, Text, TextArea, TextInput, Badge, IconContainer } from '@epam/uui';

import { capabilitiesDetailsValidationSchema } from './validation.schema';
import { ReactComponent as iconStart } from '@epam/assets/icons/navigation-chevron_right-outline.svg';
import { ReactComponent as iconInfo } from '@epam/assets/icons/content-interest-fill.svg';
import { ReactComponent as iconAI } from '@epam/assets/icons/ai-copilot_magic_small-fill.svg';


import css from './CapabilityDetailsForm.module.scss';

import { selectCapabilityDetails, loadCapabilityDetails, initNewChatTopics, startNewChat, setChatTopic, resetChatContext } from '../../../../../../../store/ai.slice';
import { getStateTitle, multiTopicChats, STATE_CODES } from '../../../../PortfolioStagesLeftPanel/structure';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import { isInvalidGeneratedResponse, useShowErrorNotification, useShowErrorRetryNotification } from '../../../../../../../utilities/notifications.utility';
import { selectPortfolioDetails, setPending } from '../../../../../../../store/data.slice';
import { FORM_DEFAULT_DATA } from '../../../../../constants';
import { useEffect } from 'react';
import { FlexSpacer, ScrollBars } from '@epam/uui-components';
import { ICapabilitiesOwnerDetails, IGetCapabilitiesDetailsRequest } from '../../../../../../../typings/models/capabilities.model';
import { sendCapabilitiesDetailsMessage } from '../../../../../../../services/capabilities.service';
import { IInteractiveChatContext, IStartChat } from '../../../../../../../typings/models/module.models';

export interface ICapabilityDetailsFormProps {
  stateCode: STATE_CODES
}

export default function CapabilityDetailsForm({ stateCode }: ICapabilityDetailsFormProps) {
  const dispatch = useAppDispatch();
  const selectedPortfolio = useAppSelector(selectPortfolioDetails);
  const capabilityDetails = useAppSelector(selectCapabilityDetails);

  useEffect(() => {
    const request: IGetCapabilitiesDetailsRequest = {
      portfolio_id: selectedPortfolio.id,
    };
    dispatch(loadCapabilityDetails(request));
  }, [dispatch, selectedPortfolio.id, stateCode]);


  const { MODULE_TAGS, LABELS, DEFAULT_API_CONTEXT_DATA } = FORM_DEFAULT_DATA.find(x => x.id === stateCode);
  const fromData = capabilityDetails ? capabilityDetails : DEFAULT_API_CONTEXT_DATA;
  
  const showErrorNotification = useShowErrorNotification();
  const showErrorRetryNotification = useShowErrorRetryNotification();
  
  
  const onSave = async (details: ICapabilitiesOwnerDetails) => {
    const modifiedState = { ...details, portfolioId: selectedPortfolio.id, stateCode: stateCode };
  
    dispatch(setPending(true));
    try {
      const response = await dispatch(initNewChatTopics(modifiedState));
      const result = { form: response.payload } as FormSaveResponse<ICapabilitiesOwnerDetails>;
      
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


  const onFillFormWithAI = () => {
    dispatch(setPending(true));
    sendCapabilitiesDetailsMessage(selectedPortfolio.id).then(data => {
      const set: React.SetStateAction<ICapabilitiesOwnerDetails> = {
        portfolioId: selectedPortfolio.id,
        name: data.name ?? form.lens.prop('name').toProps().value,
        description: data.description ?? form.lens.prop('description').toProps().value,
        category: data.category ?? form.lens.prop('category').toProps().value,
        ownerName: form.lens.prop('ownerName').toProps().value,
        ownerEmail:form.lens.prop('ownerEmail').toProps().value,
      }
      form.replaceValue(set)
      dispatch(setPending(false));
    }).catch(
      r => {
        dispatch(setPending(false));
        const errorText = r.cause?.body?.detail ?? r.message;
        if (isInvalidGeneratedResponse(errorText)) {
          showErrorRetryNotification(onFillFormWithAI);
        } else {
          showErrorNotification(errorText);
        }
      }
    );
  }  


  const form = useForm<ICapabilitiesOwnerDetails>({
    settingsKey: 'chat-start-form',
    value: fromData,
    beforeLeave: () => Promise.resolve(false),
    loadUnsavedChanges: () => Promise.reject(),
    getMetadata: capabilitiesDetailsValidationSchema,
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
              {/* Capability details */}
              <FlexRow columnGap='12' cx={css.buttonPanel}>
                <h3 style={{ margin: '0px' }}>{LABELS.apiTitle}</h3>
                <FlexSpacer />
                <Button caption='Fill with AI' icon={iconAI} fill='ghost' onClick={onFillFormWithAI} />
              </FlexRow>

              <FlexRow vPadding='12'>
                <FlexCell minWidth={550} width='100%'>
                  <LabeledInput htmlFor='capabilityDetailsName' label='Name'  {...lens.prop('name').toProps()}>
                    <TextInput {...lens.prop('name').toProps()} id='capabilityDetailsName' placeholder='Please type text' maxLength={72} />
                  </LabeledInput>
                  <Text cx={css.inputHint}>The name of the business capability</Text>
                </FlexCell>
              </FlexRow>
              <FlexRow vPadding='12'>
                <FlexCell minWidth={550} width='100%'>
                  <LabeledInput htmlFor='capabilityDetailsDescription' label='Description' {...lens.prop('description').toProps()}>
                    <TextArea {...lens.prop('description').toProps()} id='capabilityDetailsDescription' rows={4} placeholder='Please type text' />
                  </LabeledInput>
                  <Text cx={css.inputHint}>A detailed explanation of the business capability, including its purpose and scope</Text>
                </FlexCell>
              </FlexRow>
              <FlexRow vPadding='12'>
                <FlexCell minWidth={550} width='100%'>
                  <LabeledInput htmlFor='capabilityDetailsCategory' label='Category' {...lens.prop('category').toProps()}>
                    <TextInput {...lens.prop('category').toProps()} id='capabilityDetailsCategory' placeholder='Please type text' />
                  </LabeledInput>
                  <Text cx={css.inputHint}>The category under which this capability falls (e.g., Sales, Finance, Customer Support).</Text>
                </FlexCell>
              </FlexRow>

              {/* Owner information */}
              <FlexRow columnGap='12' cx={css.buttonPanel}>
                <h3 style={{ margin: '0px' }}>Owner information</h3>
              </FlexRow>

              <FlexRow vPadding='12'>
                <FlexCell minWidth={550} width='100%'>
                  <LabeledInput htmlFor='capabilityDetailsOwnerName' label='Name'  {...lens.prop('ownerName').toProps()}>
                    <TextInput {...lens.prop('ownerName').toProps()} id='capabilityDetailsOwnerName' placeholder='Please type text' maxLength={72} />
                  </LabeledInput>
                  <Text cx={css.inputHint}>The full name of the capability owner</Text>
                </FlexCell>
              </FlexRow>
              <FlexRow vPadding='12'>
                <FlexCell minWidth={550} width='100%'>
                  <LabeledInput htmlFor='capabilityDetails Email' label='Email' {...lens.prop('ownerEmail').toProps()}>
                    <TextInput {...lens.prop('ownerEmail').toProps()} id='capabilityDetails Email' type='email' placeholder='Please type text' />
                  </LabeledInput>
                  <Text cx={css.inputHint}>The contact email address for the owner</Text>
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