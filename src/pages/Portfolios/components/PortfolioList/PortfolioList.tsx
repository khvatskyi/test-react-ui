import { Button, FlexCell, FlexRow } from '@epam/uui';
import { ReactComponent as PlusIcon } from '@epam/assets/icons/action-add-fill.svg';

import { PortfolioCard } from '..';

import css from './PortfolioList.module.scss';
import { IPortfolio } from '../../../../typings/models/portfolio.models';

export interface IPortfolioListProps {
  portfolios: IPortfolio[];
  onCreateClick: () => void;
}

export default function PortfolioList({ portfolios, onCreateClick }: IPortfolioListProps) {

  return (
    <FlexCell cx={css.panelPortfolio} width='100%'>
      <FlexRow cx={css.portfolioHeader}>
        <span>Portfolios</span>
        <Button icon={PlusIcon} caption='Create a portfolio' color='primary' onClick={onCreateClick} />
      </FlexRow>
      <div className={css.portfolioListWrapper}>
        {portfolios.map(x => <PortfolioCard key={x.id} portfolio={x} />)}
      </div>
    </FlexCell>
  );
}