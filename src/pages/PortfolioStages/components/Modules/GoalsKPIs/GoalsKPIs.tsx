import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { selectChatContext, selectGoalsAndKPIs } from '../../../../../store/ai.slice';
import ChatStartForm from '../../StartForm/ChatStartForm';

import css from './GoalsKPIs.module.scss';
import ModuleTopBar from '../../TopBar/ModuleTopBar';
import { STATE_CODES } from '../../PortfolioStagesLeftPanel/structure';
import UncompletedModule from '../../UncompletedModule/UncompletedModule';
import { selectCompletedModules } from '../../../../../store/data.slice';
import GoalsKPIsSummary from './components/GoalsKPIsSummary/GoalsKPIsSummary';
import { getGoalsAndKPIs } from '../../../../../store/goals-and-kpis.slice';

export interface IGoalsKPIsProps {
  portfolioId: string;
}

const CURRENT_STATE_CODE = STATE_CODES.GoalsAndKPIs;

export default function GoalsKPIs({ portfolioId }: IGoalsKPIsProps) {
  const dispatch = useAppDispatch();
  const chatContext = useAppSelector(selectChatContext);
  const goalsAndKPIs = useAppSelector(selectGoalsAndKPIs);
  const completedModules = useAppSelector(selectCompletedModules);

  let uncompletedModules: STATE_CODES[] = [];
  if (!Boolean(completedModules.find(x => x === STATE_CODES.ValueProposition))){
    uncompletedModules.push(STATE_CODES.ValueProposition)
  }
  if (!Boolean(completedModules.find(x => x === STATE_CODES.BusinessModel))){
    uncompletedModules.push(STATE_CODES.BusinessModel)
  }
  const hasUncompletedModules = uncompletedModules.length > 0;
  
  useEffect(() => {
    if (portfolioId) {
      dispatch(getGoalsAndKPIs({ portfolio_id: portfolioId }));
    }
  }, [dispatch, portfolioId, chatContext]);


  return portfolioId && (
    <div className={css.root}>
      <ModuleTopBar stateCode={CURRENT_STATE_CODE} />
      {hasUncompletedModules && <UncompletedModule portfolioId={portfolioId} stageCodes={uncompletedModules} />}
      {!hasUncompletedModules && 
        <>
          {!goalsAndKPIs && <ChatStartForm stateCode={CURRENT_STATE_CODE} />}
          {goalsAndKPIs && <GoalsKPIsSummary  portfolioId={portfolioId} summary={goalsAndKPIs} />}
        </>
      }
    </div>
  )
}
