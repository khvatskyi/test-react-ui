import { ReactComponent as NotificationCheckFillIcon } from '@epam/assets/icons/notification-check-fill.svg';

import { STATE_CODES, portfolioStates } from './structure';
import { Sidebar } from './sidebar';
import { useParamId, useQuery } from './../../../../utilities/route.utility';
import { useAppSelector } from '../../../../hooks';
import { selectCompletedModules } from '../../../../store/data.slice';

import css from './PortfolioStagesLeftPanel.module.scss';

export default function PortfolioStagesSidebar() {
  const portfolioId = useParamId();
  const selectedStage = useQuery('stage', STATE_CODES.AboutPortfolio);
  const completedModules = useAppSelector(selectCompletedModules);

  portfolioStates.forEach(state => {
    const isCompleted = Boolean(completedModules.find(x => x === state.id));
    state.completed = isCompleted;
    state.icon = isCompleted ? NotificationCheckFillIcon : null;
  });

  return (
    <Sidebar
      value={selectedStage}
      items={portfolioStates}
      itemCx={css.completedIcon}
      getItemLink={
        (row) => ({
          pathname: `/portfolio/stages/${portfolioId}`,
          query: {
            stage: row.id,
          },
        })
      }
    />
  );
}
