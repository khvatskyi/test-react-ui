import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { PortfolioStagesLeftPanel, PortfolioStagesContent } from './components';
import { loadPortfolio, selectPortfolioDetails } from '../../store/data.slice';
import css from './PortfolioStages.module.scss';

type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

export default function PortfolioStages() {
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    if (id) {
      dispatch(loadPortfolio(id));
    }
  }, [dispatch, id])

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
        <PortfolioStagesContent portfolio={ portfolio } onUpdateClick={handlePortfolioUpdate} />
      </div>    
    </div>    
  );
}
