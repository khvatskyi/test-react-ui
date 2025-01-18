import { FormSaveResponse, useForm } from '@epam/uui-core';
import { FlexCell, FlexRow, LabeledInput, Panel, Button, Text, TextArea, TextInput, Badge, IconContainer } from '@epam/uui';

import { IApiContext } from '../../../../../../../../typings/models/module.models';
import { apiContextValidationSchema } from './validation.schema';
import { ReactComponent as iconStart } from '@epam/assets/icons/navigation-chevron_right-outline.svg';
import { ReactComponent as iconInfo } from '@epam/assets/icons/content-interest-fill.svg';


import css from './ChatStartForm.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks';
import { selectPortfolioDetails, sendStartValuePropositionChat } from '../../../../../../../../store/data.slice';
import { useShowErrorNotification } from '../../../../../../../../utilities/notifications.utility';


const DEFAULT_API_CONTEXT_DATA: IApiContext = {  
  name: 'TEST: Business insurance quote enablement',
  description: "TEST: The API Product will enable insurance brokers and agents request a quote from the insurance carrier 'Travelers Insurance' directly from their Agency/Broker Management System.",
} as const;


const MODULE_TAGS = [
  'Target consumers',
  'Unique solution',
  'Primary benefits',
  'Competitive edge',
  'Success metrics',
]

const LABELS = {
  moduleTitle: 'Module objective',
  moduleDescription: 'The purpose of the of the Value Proposition module is to clearly articulate the unique benefits and advantages that the API offers to developers and businesses, demonstrating how it can solve specific problems, streamline processes, or enhance existing systems, ultimately driving adoption and usage.',
  apiTitle: 'API context',
  tipMessage: 'To get most out of AI capabilities when completing the modules, try to follow the order presented in the left navigation.'
}
export default function ChatStartForm() {
  const dispatch = useAppDispatch();
  const selectedPortfolio = useAppSelector(selectPortfolioDetails);

  const dataFromPortfolio: IApiContext = {  
    name: selectedPortfolio.name,
    description: selectedPortfolio.description,
  } 
    
  const dataFromStore = null; //useAppSelector(selectProfile);
  const defaultFormData = dataFromStore ?? dataFromPortfolio ?? DEFAULT_API_CONTEXT_DATA;
  const showErrorNotification = useShowErrorNotification();    
  
  const onSave = (state: IApiContext) => {
    state.portfolioId = selectedPortfolio.id
    const result = dispatch(sendStartValuePropositionChat(state))
    .then(x => ({ form: x.payload } as FormSaveResponse<IApiContext>))
    .catch(
      r => {
        const errorText = r.cause?.body?.detail ?? r.message;//TODO: need check if it works
        showErrorNotification(errorText)
      }
    );
    return result 
  };


  const form = useForm<IApiContext>({
    settingsKey: 'chat-start-form',
    value: defaultFormData,
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
          <h3 style={{ margin: '0px' }}>{ LABELS.moduleTitle }</h3>
        </FlexCell>
        <FlexCell width='100%'>
          <Text cx={css.description}>{  LABELS.moduleDescription  } </Text>
        </FlexCell>
        <div style={ { display: 'flex', flexWrap: 'wrap', gap: '12px' } }>
          { MODULE_TAGS.map( (tag) => ( 
            <Badge color="neutral" fill="outline" caption={tag} /> 
            )) }
        </div>        
        <FlexCell width='100%'>
          <h3 style={{ margin: '0px' }}>{ LABELS.apiTitle }API context</h3>
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
                <TextArea {...lens.prop('description').toProps()} id='chatStartDescription' rows={ 4 } placeholder='Please type text' />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
        </FlexCell>
        <FlexRow vPadding="12">
          <Button caption="Start chat" color="primary" icon={iconStart} iconPosition='right' onClick={ form.save }  />
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