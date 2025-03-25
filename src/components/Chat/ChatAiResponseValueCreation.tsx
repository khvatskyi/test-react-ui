import { FlexRow, Button, FlexSpacer, Text, Panel, PickerInput } from '@epam/uui';
import { IChatMessageInterviewQuestion } from '../../typings/models/module.models';
import { useAppSelector } from '../../hooks';
import { selectValueCreationModels } from '../../store/data.slice';
import { useArrayDataSource } from '@epam/uui-core';
import { useState } from 'react';
import css from './ChatAiResponseValueCreation.module.scss';
import { ReactComponent as DoneIcon } from '@epam/assets/icons/notification-done-outline.svg';
import { IValueCreationModel } from '../../typings/models/business-model.models';


export interface IChatAiResponseValueCreationProps {
  onSendResponce: (message: string, isAiGenerated: boolean) => void;
  message: IChatMessageInterviewQuestion;
}

export default function ChatAiResponseValueCreation( { onSendResponce, message }: IChatAiResponseValueCreationProps ) {
  const valueCreationModels = useAppSelector(selectValueCreationModels);
  const modelsDataSource = useArrayDataSource<IValueCreationModel, string, unknown>({ items: valueCreationModels, getId: ({ name }) => name }, []);

  let firstModel = null;
  if (valueCreationModels?.length > 0) {
    firstModel = valueCreationModels[0];
  }

  const [model, setModel] = useState<IValueCreationModel>(firstModel);
  
  const handleConfirmClick = () => {    
    onSendResponce(model.name, false);
  }

  return (
    <>
    <FlexRow>
      <FlexSpacer />
      <Panel background='surface-main' cx={css.panelQuestion} >
        <Text cx={css.questionText} fontWeight='600' size='48'>Choose relevant model from the list:</Text>

        <PickerInput
          dataSource={modelsDataSource}
          value={model}
          onValueChange={setModel}
          selectionMode='single'
          getName={(item) => item.name}
          valueType='entity'
          id={'select-model'}
          placeholder='Not selected'
          editMode='dropdown'
          disableClear={true}
          isRequired={true}
          searchPosition='none'
        />

        {model && (
          <>
            <h5 className={css.modelTitle}>DESCRIPTION</h5>
            <Text cx={css.modelLabel} size='48'>{model.description}</Text>
            <h5 className={css.modelTitle}>EXAMPLES</h5>
            <Text cx={css.modelLabel} size='48'>{model.examples?.join(', ')}</Text>
            <FlexRow>
              <Button icon={DoneIcon} color="primary" fill='none' caption='Confirm selection' onClick={handleConfirmClick} />
              <FlexSpacer />
            </FlexRow>
          </>
        )}
      </Panel>
    </FlexRow>
    </>
  );
}

