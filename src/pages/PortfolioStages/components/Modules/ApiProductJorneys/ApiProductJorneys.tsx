import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { getApiProductJourney, resetChatContext, selectChatContext, selectProductJurney } from '../../../../../store/ai.slice';

import css from './ApiProductJorneys.module.scss';
import ModuleTopBar from '../../TopBar/ModuleTopBar';
import { STATE_CODES } from '../../PortfolioStagesLeftPanel/structure';
import ScenarioDetailsForm from '../../ScenarioDetails/ScenarioDetailsForm';
import ApiProductJorneySummary from './ApiProductJorneySummary';
import UncompletedModule from '../../UncompletedModule/UncompletedModule';
import { removeCompletedModule, selectCompletedModules } from '../../../../../store/data.slice';

export interface IApiProductJorneysProps {
  portfolioId: string;
}

const CURRENT_STATE_CODE = STATE_CODES.APIProductJourneys;

export default function ApiProductJorneys({ portfolioId }: IApiProductJorneysProps) {
  const dispatch = useAppDispatch();
  const chatContext = useAppSelector(selectChatContext);
  const productJurney = useAppSelector(selectProductJurney);
  const completedModules = useAppSelector(selectCompletedModules);
  const valuePropositionIsCompleted = Boolean(completedModules.find(x => x === STATE_CODES.ValueProposition));

  const onEditScenarioClick = () => {
    dispatch(resetChatContext({ portfolioId: portfolioId, stateCode: CURRENT_STATE_CODE }))
      .then(() => dispatch(removeCompletedModule(CURRENT_STATE_CODE)));
  }
  
  useEffect(() => {
    if (portfolioId) {
      dispatch(getApiProductJourney({ portfolio_id: portfolioId }));
    }
  }, [dispatch, portfolioId, chatContext]);

  return portfolioId && (
    <div className={css.root}>
      <ModuleTopBar stateCode={CURRENT_STATE_CODE} />
      {!valuePropositionIsCompleted && <UncompletedModule portfolioId={portfolioId} stateCode={STATE_CODES.ValueProposition} />}
      {valuePropositionIsCompleted && 
        <>
          {!productJurney && <ScenarioDetailsForm stateCode={CURRENT_STATE_CODE} />}
          {productJurney && <ApiProductJorneySummary portfolioId={portfolioId} productJurney={productJurney} onEditScenarioClick={onEditScenarioClick} />}
        </>
      }
    </div>
  )
}
