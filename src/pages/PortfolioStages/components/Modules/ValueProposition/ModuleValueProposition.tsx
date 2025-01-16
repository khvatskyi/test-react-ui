import ChatStartForm from './components/Chat/StartForm/ChatStartForm';
import ModuleValuePropositionTopBar from './components/TopBar/ModuleValuePropositionTopBar';
import css from './ModuleValueProposition.module.scss';

export interface IModuleValuePropositionProps {
  onUpdateClick: (e?: any) => void;
}

export default function ModuleValueProposition({ onUpdateClick }: IModuleValuePropositionProps) {

  return (
    <div className={css.root}>
      <ModuleValuePropositionTopBar onUpdateClick={onUpdateClick} />
      <ChatStartForm />
    </div>
  )
}
