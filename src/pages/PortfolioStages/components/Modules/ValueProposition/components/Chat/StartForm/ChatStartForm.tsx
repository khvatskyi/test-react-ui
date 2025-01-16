import { FormSaveResponse, useForm } from '@epam/uui-core';
import { FlexCell, FlexRow, LabeledInput, Panel, Button, TextArea, TextInput } from '@epam/uui';

import { IApiContext } from '../../../../../../../../typings/models/module.models';
import { apiContextValidationSchema } from './validation.schema';
import { ReactComponent as iconStart } from '@epam/assets/icons/navigation-chevron_right-outline.svg';


import css from './ChatStartForm.module.scss';
import { useAppDispatch } from '../../../../../../../../hooks';
import { updateValueProposition } from '../../../../../../../../store/data.slice';
import { useParamId } from '../../../../../../../../utilities/route.utility';


const DEFAULT_API_CONTEXT_DATA: IApiContext = {  
  name: 'Business insurance quote enablement',
  description: "The API Product will enable insurance brokers and agents request a quote from the insurance carrier 'Travelers Insurance' directly from their Agency/Broker Management System.",
} as const;


export default function ChatStartForm() {
  const dispatch = useAppDispatch();
  const portfolioId = useParamId();
    
  const dataFromStore = null; //useAppSelector(selectProfile);
  const defaultFormData = dataFromStore ?? DEFAULT_API_CONTEXT_DATA;

  const onSave = (state: IApiContext) => {
    state.portfolioId = portfolioId
    return dispatch(updateValueProposition(state))
    .then(x => ({ form: x.payload } as FormSaveResponse<IApiContext>));
  }

  // const onSuccess = () => {
    // showSuccessNotification('Data has been saved!')
  // }

  const form = useForm<IApiContext>({
    settingsKey: 'chat-start-form',
    value: defaultFormData,
    beforeLeave: () => Promise.resolve(false),
    loadUnsavedChanges: () => Promise.resolve(),
    getMetadata: apiContextValidationSchema,
    onSave: onSave,
    // onSuccess: onSuccess
  });
  form.canRedo = false;
  const { lens } = form;
 
  return (
    <div className={css.rootForm}>
      <Panel cx={css.formPanel} >
        <FlexCell width='100%'>
          <h3 style={{ margin: '0px' }}>API context</h3>
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
                <TextArea {...lens.prop('description').toProps()} id='chatStartDescription' placeholder='Please type text' />
              </LabeledInput>
            </FlexCell>
          </FlexRow>
        </FlexCell>
        <FlexRow vPadding="12">
          <Button caption="Start chat" color="primary" icon={iconStart} iconPosition='right' onClick={ form.save }  />
        </FlexRow>        
      </Panel>
    </div>
  )
}