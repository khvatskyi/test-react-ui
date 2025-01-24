import { Panel } from '@epam/uui';
import { useHistory } from 'react-router-dom';

import StartWizardForm from '../../components/StartWizard/components/StartWizardForm/StartWizardForm';
import css from './GettingStarted.module.scss';


export default function GettingStarted() {

  const history = useHistory();

  const handleWizardNextClick = () => {
    history.push('/profile')
  }

  return (
    <div className={css.root}>
        <Panel background="surface-main" cx={css.loginWrapper} shadow>
          <StartWizardForm activeStep={1} onNextClick={handleWizardNextClick}/>
        </Panel>
    </div>
  );
}
