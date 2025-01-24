import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { FlexRow, FlexCell, FlexSpacer, Panel } from '@epam/uui';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { loadPortfolio, loadPortfolios, removeCompletedModule, selectPortfolioDetails } from '../../../../store/data.slice';

import css from './ModuleTopBar.module.scss';
import { getStateTitle, STATE_CODES } from '../PortfolioStagesLeftPanel/structure';
import { clearChatContext, resetChatContext } from '../../../../store/ai.slice';
import { PortfolioPicker } from '../../../../components';
import { ResetProgressButton } from '../ResetProgressButton/ResetProgressButton';

export interface IModuleTopBarProps {
  stateCode: STATE_CODES;
}

export default function ModuleTopBar({ stateCode }: IModuleTopBarProps) {
  const dispatch = useAppDispatch();
  const selectedPortfolio = useAppSelector(selectPortfolioDetails);
  const history = useHistory();

  useEffect(() => {
    dispatch(loadPortfolios());
  }, [dispatch]);

  const handleResetClick = () => {
    dispatch(resetChatContext({ portfolioId: selectedPortfolio.id, stateCode }))
      .then(() => dispatch(removeCompletedModule(stateCode)));
  }

  const handlePortfolioChange = (id: string) => {
    dispatch(clearChatContext());
    dispatch(loadPortfolio(id));
    history.push(`${id}?stage=${stateCode}`);
  };

  return  (
    <Panel cx={css.buttonPanel}>
      <FlexRow columnGap='24' cx={css.buttonPanel}>
        <h2>{getStateTitle(stateCode)}</h2>
        <FlexCell width='auto'>
          <PortfolioPicker portfolio={selectedPortfolio} onPortfolioChange={handlePortfolioChange}/>
        </FlexCell>
        <FlexSpacer />
        <ResetProgressButton onResetClick={handleResetClick} stageName={getStateTitle(stateCode)}/>
      </FlexRow>        
    </Panel>
  );
}
