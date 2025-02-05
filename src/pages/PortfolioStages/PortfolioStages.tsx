import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { PortfolioStagesLeftPanel, PortfolioStagesContent } from './components';
import { getSuccessfullyCompletedModules, loadPortfolio, selectPortfolioDetails } from '../../store/data.slice';
import css from './PortfolioStages.module.scss';
import { useParamId, useQuery } from '../../utilities/route.utility';
import { STATE_CODES } from './components/PortfolioStagesLeftPanel/structure';
import ModuleValueProposition from './components/Modules/ValueProposition/ModuleValueProposition';
import ApiProductJorneys from './components/Modules/ApiProductJorneys/ApiProductJorneys';
import DiscoverOverview from './components/DiscoverOverview/DiscoverOverview';
import ConsumersAndNeeds from './components/Modules/ConsumersAndNeeds/ConsumersAndNeeds';

type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

export default function PortfolioStages() {
  const dispatch = useAppDispatch();
  const portfolioId = useParamId();
  const selectedStage = useQuery('stage', STATE_CODES.AboutPortfolio);

  useEffect(() => {
    if (portfolioId) {
      dispatch(loadPortfolio(portfolioId));
      dispatch(getSuccessfullyCompletedModules(portfolioId));
    }
  }, [dispatch, portfolioId])

  const portfolio = useAppSelector(selectPortfolioDetails);

  const history = useHistory();
  const handlePortfolioUpdate = (e: ClickEvent) => {
    e.stopPropagation();
    history.push(`/portfolio/details/${portfolio.id}`);
  }

  const implementedStates = [
    STATE_CODES.AboutPortfolio,
    STATE_CODES.Discover,
    STATE_CODES.ValueProposition,
    STATE_CODES.ConsumersAndNeeds,
    STATE_CODES.APIProductJourneys,
  ];

  return (
    <div className={css.root}>
      <div className={css.sidebar} >
        <PortfolioStagesLeftPanel />
      </div>
      <div className={css.content}>
        {(selectedStage === STATE_CODES.AboutPortfolio) && <PortfolioStagesContent showOnlyTopBar={false} portfolio={portfolio} onUpdateClick={handlePortfolioUpdate} />}
        {(selectedStage === STATE_CODES.Discover) && <DiscoverOverview portfolio={portfolio} onUpdateClick={handlePortfolioUpdate} />}
        {(selectedStage === STATE_CODES.ValueProposition) && <ModuleValueProposition portfolioId={portfolio?.id} />}
        {(selectedStage === STATE_CODES.ConsumersAndNeeds) && <ConsumersAndNeeds portfolioId={portfolio?.id} />}
        {(selectedStage === STATE_CODES.APIProductJourneys) && <ApiProductJorneys portfolioId={portfolio?.id} />}
        

        {/* temporary */}
        {!implementedStates.includes(selectedStage) && <PortfolioStagesContent showOnlyTopBar={true} portfolio={portfolio} onUpdateClick={handlePortfolioUpdate} />}
      </div>
    </div>
  );
}
