import { FlexRow, FlexSpacer, Text, Panel } from '@epam/uui';
import { IChatMessageInterviewQuestion } from '../../typings/models/module.models';
import { useAppSelector } from '../../hooks';
import { selectValueCreationModels } from '../../store/data.slice';
import { useState } from 'react';
import css from './ChatAiResponseValueCreators.module.scss';
import ChatAiButton from './ChatAiButton';
import { IValueCreationModel } from '../../typings/models/business-model.models';


export interface IChatAiResponseValueCreatorsProps {
  onSendResponce: (message: string, isAiGenerated: boolean) => void;
  message: IChatMessageInterviewQuestion;
}

export default function ChatAiResponseValueCreators( { onSendResponce, message }: IChatAiResponseValueCreatorsProps ) {
  const valueCreationModels = useAppSelector(selectValueCreationModels);
  
  let firstModel = null;
  if (valueCreationModels?.length > 1) {
    firstModel = valueCreationModels[1];
  }

  const [model] = useState<IValueCreationModel>(firstModel);
  
  const handleAiAnswerClick = () => {
    let value: any = message.example;
    if (typeof value != 'string') {
      if (Array.isArray(value)) {
        value = value.join(', ')
      }
    }

    onSendResponce(value, true);
  };

  return (
    <>
    {model && (
    <FlexRow>
      <FlexSpacer />
      <Panel background='surface-main' cx={css.panelQuestion} >
        <Text cx={css.modelLabel} size='48'>Examples of possible value creators may include:</Text>
        {model.value_creation.map( (value, index) => { 
                  return (
                    <Text cx={css.modelLabel} size='48'>- {value}</Text>
                  )
                }
              )}
      </Panel>
    </FlexRow>
    )}
    <FlexRow>
      <FlexSpacer />
      <ChatAiButton caption='Answer with AI' onClick={handleAiAnswerClick} />
    </FlexRow>
    </>
  );
}

