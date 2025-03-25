import { IChatMessageInterviewQuestion } from '../../typings/models/module.models';
import ChatAiButton from './ChatAiButton';

export interface IChatAiResponseProps {
  onSendResponce: (message: string, isAiGenerated: boolean) => void;
  message: IChatMessageInterviewQuestion;
}

export default function ChatAiResponse({ onSendResponce, message }: IChatAiResponseProps) {
  
  const handleAiAnswerClick = () => {
    let value: any = message.example;
    if (typeof value != 'string') {
      if (Array.isArray(value)) {
        value = value.join(', ')
      }
    }

    onSendResponce(value, true);
  };

  return <ChatAiButton caption='Answer with AI' onClick={handleAiAnswerClick} />
}

