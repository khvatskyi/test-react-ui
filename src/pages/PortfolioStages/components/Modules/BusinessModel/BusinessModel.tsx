import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { getBusinessModelCanvas, selectBusinessModelCanvas } from '../../../../../store/ai.slice';
import BusinessModelStartForm from './components/BusinessModelStartForm/BusinessModelStartForm';

import css from './BusinessModel.module.scss';
import ModuleTopBar from '../../TopBar/ModuleTopBar';
import { STATE_CODES } from '../../PortfolioStagesLeftPanel/structure';
import UncompletedModule from '../../UncompletedModule/UncompletedModule';
import { getValueCreationModules, selectCompletedModules } from '../../../../../store/data.slice';
import ChatViewSummary from '../../../../../components/ChatSummary/ChatViewSummary';

export interface IBusinessModelProps {
  portfolioId: string;
}

const CURRENT_STATE_CODE = STATE_CODES.BusinessModel;

export default function BusinessModel({ portfolioId }: IBusinessModelProps) {
  const dispatch = useAppDispatch();
  const businessModelCanvas = useAppSelector(selectBusinessModelCanvas);
  const completedModules = useAppSelector(selectCompletedModules);

  let uncompletedModules: STATE_CODES[] = [];
  if (!Boolean(completedModules.find(x => x === STATE_CODES.ValueProposition))){
    uncompletedModules.push(STATE_CODES.ValueProposition)
  }
  if (!Boolean(completedModules.find(x => x === STATE_CODES.ConsumersAndNeeds))){
    uncompletedModules.push(STATE_CODES.ConsumersAndNeeds)
  }
  const hasUncompletedModules = uncompletedModules.length > 0;

  useEffect(() => {
    if (portfolioId) {
      dispatch(getBusinessModelCanvas({ portfolio_id: portfolioId, state_code: CURRENT_STATE_CODE }));

      dispatch(getValueCreationModules());
    }
  }, [dispatch, portfolioId]);

  return portfolioId && (
    <div className={css.root}>
      <ModuleTopBar stateCode={CURRENT_STATE_CODE} />
      {hasUncompletedModules && <UncompletedModule portfolioId={portfolioId} stageCodes={uncompletedModules} />}
      {!hasUncompletedModules && 
        <>
          {!businessModelCanvas && <BusinessModelStartForm stateCode={CURRENT_STATE_CODE} />}
          {businessModelCanvas && <ChatViewSummary portfolioId={portfolioId} stateCode={CURRENT_STATE_CODE} summaryObject={businessModelCanvas} />}
        </>
      }
    </div>
  )
}
