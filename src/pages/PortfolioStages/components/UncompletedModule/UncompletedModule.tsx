import { FlexRow, FlexCell, Text, Button, FlexSpacer } from '@epam/uui';

import css from './UncompletedModule.module.scss';
import { getStateTitle, STATE_CODES } from '../PortfolioStagesLeftPanel/structure';
import { useHistory } from 'react-router-dom';

const LABELS = {
  text: 'In order to continue, complete Value proposition module first.',
  button: 'Go to module',
};

export interface IUncompletedModuleProps {
    portfolioId: string;
    stateCode: STATE_CODES;
}

export default function UncompletedModule({ portfolioId, stateCode }: IUncompletedModuleProps) {
  const history = useHistory();

  const onGoButtonClick = () => {
    history.push(`/portfolio/stages/${portfolioId}?stage=${stateCode}`);
  }


  return (
    <FlexCell cx={css.root} width='100%'>
      <FlexSpacer />
      <FlexRow>
        <div style={{ textAlign: 'center' }}>
          <FlexRow>
          <FlexSpacer />
          <img src='/icons/uncompleted-module.svg' alt=''></img>
          <FlexSpacer />
          </FlexRow>
          <FlexRow cx={css.labelContainer}>
            <FlexSpacer />
            <Text fontSize='16' fontWeight='400' > 
              <span>In order to continue, complete</span>
              {' '}
              <b>{getStateTitle(stateCode)}</b>
              {' '}
              <span>module first.</span>
            </Text>
            <FlexSpacer />
          </FlexRow>
          <FlexRow>
            <FlexSpacer />
            <Button caption={LABELS.button} color='primary' onClick={onGoButtonClick} /> 
            <FlexSpacer />
          </FlexRow>
        </div>
      </FlexRow>
      <FlexSpacer />
    </FlexCell>
  );
}
