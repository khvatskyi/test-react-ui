import { FormSaveResponse, useForm } from '@epam/uui-core';
import { FlexCell, FlexRow, LabeledInput, Panel, Button, Text, TextArea, TextInput, Badge, IconContainer } from '@epam/uui';

import { apiContextValidationSchema } from './validation.schema';
import { ReactComponent as iconStart } from '@epam/assets/icons/navigation-chevron_right-outline.svg';
import { ReactComponent as iconInfo } from '@epam/assets/icons/content-interest-fill.svg';


import css from './ChatStartForm.module.scss';

import { startNewChat } from '../../../../store/ai.slice';
import { STATE_CODES } from '../PortfolioStagesLeftPanel/structure';
import { IStartChatInfo } from '../../../../typings/models/module.models';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { useShowErrorNotification } from '../../../../utilities/notifications.utility';
import { selectPortfolioDetails, setPending } from '../../../../store/data.slice';
import { FORM_DEFAULT_DATA } from '../../constants';

export interface IChatStartFormProps {
  stateCode: STATE_CODES
}

export default function ChatStartForm({ stateCode }: IChatStartFormProps) {
  const dispatch = useAppDispatch();
  const selectedPortfolio = useAppSelector(selectPortfolioDetails);
  const { MODULE_TAGS, LABELS, DEFAULT_API_CONTEXT_DATA } = FORM_DEFAULT_DATA.find(x => x.id === stateCode);

  const showErrorNotification = useShowErrorNotification();

  const onSave = async (state: IStartChatInfo) => {
    const modifiedState = { ...state, portfolioId: selectedPortfolio.id };
  
    dispatch(setPending(true));
    try {
      const response = await dispatch(startNewChat({ context: modifiedState, stateCode }));
      const result = { form: response.payload } as FormSaveResponse<IStartChatInfo>;
      return result;
    } catch (error) {
      const errorText = error?.cause?.body?.detail ?? error.message;
      showErrorNotification(errorText);
    } finally {
      dispatch(setPending(false));
    }
  };


  const form = useForm<IStartChatInfo>({
    settingsKey: 'chat-start-form',
    value: DEFAULT_API_CONTEXT_DATA,
    beforeLeave: () => Promise.resolve(false),
    loadUnsavedChanges: () => Promise.resolve(),
    getMetadata: apiContextValidationSchema,
    onSave: onSave,
  });
  form.canRedo = false;
  const { lens } = form;

  return (
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
        <FlexCell width='100%'>
          <h3 style={{ margin: '0px' }}>{LABELS.apiTitle}</h3>
        </FlexCell>
        <FlexCell width='100%'>
          <FlexRow vPadding='12'>
            <FlexCell minWidth={550} width='100%'>
              <LabeledInput htmlFor='chatStartName' label='API name'  {...lens.prop('name').toProps()}>
                <TextInput {...lens.prop('name').toProps()} id='chatStartName' placeholder='Please type text' maxLength={72} />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
          <FlexRow vPadding='12'>
            <FlexCell minWidth={550} width='100%'>
              <LabeledInput htmlFor='chatStartDescription' label='Description' {...lens.prop('description').toProps()}>
                <TextArea {...lens.prop('description').toProps()} id='chatStartDescription' rows={4} placeholder='Please type text' />
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
  )
}