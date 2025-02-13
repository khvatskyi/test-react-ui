import { useHistory } from 'react-router-dom';

import { FrameworkCard } from '../../../../components';
import { CARDS } from '../../../../data/framework-data/cards';
import { FrameworkTab } from '../../../../typings/enums/framework-tab.enum';
import { IStage } from '../../../../typings/models/framework.models';
import { IPortfolioDetails } from '../../../../typings/models/portfolio.models';
import PortfolioStagesTopBar from '../PortfolioStagesTopBar/PortfolioStagesTopBar';
import css from './DiscoverOverview.module.scss';
import { useAppSelector } from '../../../../hooks';
import { selectCompletedModules } from '../../../../store/data.slice';
import { StageStatus } from '../../../../typings/enums/stage-status.enum';

export interface IDiscoverOverviewProps {
  portfolio: IPortfolioDetails;
  onUpdateClick: (e?: any) => void;
}

const DISCOVER_CARD = CARDS.find(x => x.title === FrameworkTab.Discover);

export default function DiscoverOverview({ portfolio, onUpdateClick }: IDiscoverOverviewProps) {
  const history = useHistory();
  const completedStages = useAppSelector(selectCompletedModules);

  DISCOVER_CARD.categories.forEach(category => {

    category.status = !!completedStages.find(x => x === category.path) ? StageStatus.Complete : StageStatus.None;

    category.stages?.forEach(stage => {
      stage.status = !!completedStages.find(x => x === stage.path) ? StageStatus.Complete : StageStatus.None;
    })
  });

  const handleStageClick = (stage: IStage) => {
    if (stage.path) {
      history.push(`/portfolio/stages/${portfolio.id}?stage=${stage.path}`);
    }
  }

  return (
    <div className={css.root}>
      <PortfolioStagesTopBar onUpdateClick={onUpdateClick} />
      <div className={css.cardWrapper}>
        <FrameworkCard {...DISCOVER_CARD} onStageClick={handleStageClick} cx={css.card} isSingleCard={true} />
      </div>
    </div>
  )
}