import { useAppSelector } from '../../../../../hooks';
import { selectValuePropositionChatInfo } from '../../../../../store/data.slice';
import ChatRoom from '../../../../ChatRoom/ChatRoom';
import ChatStartForm from './components/Chat/StartForm/ChatStartForm';
import ModuleValuePropositionTopBar from './components/TopBar/ModuleValuePropositionTopBar';
import css from './ModuleValueProposition.module.scss';

export default function ModuleValueProposition() {
  
  const chatInfo = useAppSelector(selectValuePropositionChatInfo);
    
  return (
    <div className={css.root}>
      <ModuleValuePropositionTopBar/>
      { !chatInfo && <ChatStartForm /> }
      { chatInfo && <ChatRoom />  }
    </div>
  )
}
