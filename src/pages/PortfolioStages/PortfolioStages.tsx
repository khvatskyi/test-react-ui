import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { PortfolioStagesLeftPanel, PortfolioStagesContent } from './components';
import { loadPortfolio, selectPortfolioDetails } from '../../store/data.slice';
import css from './PortfolioStages.module.scss';
import { useParamId, useQuery } from '../../utilities/route.utility';
import { STATE_CODES } from './components/PortfolioStagesLeftPanel/structure';

type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

export default function PortfolioStages() {
  const dispatch = useAppDispatch();
  const portfolioId = useParamId();
  const selectedStage = useQuery('stage', STATE_CODES.AboutPortfolio);

  useEffect(() => {
    if (portfolioId) {
      dispatch(loadPortfolio(portfolioId));
    }
  }, [dispatch, portfolioId])

  const portfolio = useAppSelector(selectPortfolioDetails); //TODO: need to change to PortfolioStages

  const history = useHistory();
  const handlePortfolioUpdate = (e: ClickEvent) => {
    e.stopPropagation();
    history.push(`/portfolio/details/${portfolio.id}`); 
  }

  return (
    <div className={css.root}>
      <div className={css.sidebar} >
        <PortfolioStagesLeftPanel />
      </div>
      <div className={css.content}>
        { (selectedStage === STATE_CODES.AboutPortfolio) && <PortfolioStagesContent portfolio={ portfolio } onUpdateClick={handlePortfolioUpdate} /> }
      </div>    
    </div>    
  );
}
