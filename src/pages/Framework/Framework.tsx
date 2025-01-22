import { useState } from 'react';

import { FlexCell } from '@epam/uui';

import { FrameworkCard } from '../../components';
import { PortfolioPicker } from '../../components';

import css from './Framework.module.scss';

import Tabs from './components/Tabs';
import { FrameworkTab } from '../../typings/enums/framework-tab.enum';
import { TABS } from '../../data/framework-data/tabs';
import { IStage } from '../../typings/models/framework.models';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loadPortfolio, selectPortfolioDetails } from '../../store/data.slice';

const DEFAULT_TAB = FrameworkTab.Discover;

export default function Framework() {
  const dispatch = useAppDispatch();
  const [value, onValueChange] = useState(DEFAULT_TAB);
  const tab = TABS.find(x => x.name === value);
  const selectedPortfolio = useAppSelector(selectPortfolioDetails);

  const handlePortfolioChange = (id: string) => {
    dispatch(loadPortfolio(id));
  };

  const onStageClick = (stage: IStage) => {
    console.log(stage);
  }

  return (
    <div className={css.root}>
      <FlexCell cx={css.portfolioWrapper} >
        <span><b>Portfolio:</b></span>
        <PortfolioPicker portfolio={selectedPortfolio} onPortfolioChange={handlePortfolioChange} disableClear={false} />
      </FlexCell>
      <FlexCell cx={css.stageWrapper}>
        <span><b>Stage:</b></span>
        <Tabs initialTab={DEFAULT_TAB} onTabChange={onValueChange} />
      </FlexCell>
      <div className={css.cardWrapper}>
        {tab.cards.map(card => <FrameworkCard key={tab.name + '_' + card.title} {...card} onStageClick={onStageClick} />)}
      </div>
    </div>
  );
}
