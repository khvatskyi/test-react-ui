import { Panel, RichTextView } from '@epam/uui';
import { useHistory } from 'react-router-dom';

import StartWizardForm from '../../components/StartWizard/components/StartWizardForm/StartWizardForm';
import css from './GettingStarted.module.scss';
import { useAppSelector } from '../../hooks';
import { selectUserContext } from '../../store/session.slice';


export default function GettingStarted() {

  const userContext = useAppSelector(selectUserContext);
  const history = useHistory();
  const handleWizardNextClick = () => {
    history.push('/profile')
  }

  return (
    <div className={css.root}>
        <div className={css.contentWrapper}>
          <RichTextView cx={css.userContext}>Hi, {userContext.givenName}!</RichTextView>
          <RichTextView cx={css.userHint}>Let’s begin your API Producer Journey</RichTextView>
          <Panel cx={css.formWrapper} shadow>
            <StartWizardForm activeStep={1} onNextClick={handleWizardNextClick}/>
          </Panel>
        </div>
    </div>
  );
}
