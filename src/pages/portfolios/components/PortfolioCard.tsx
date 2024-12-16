import { useHistory } from 'react-router-dom';

import { ReactComponent as EditIcon } from '@epam/assets/icons/content-edit-fill.svg';
import { Button } from '@epam/uui';

import { IPortfolio } from '../../../models/portfolio.model';
import css from './PortfolioCard.module.scss';

interface IPortfolioCardProps {
  portfolio: IPortfolio
}

type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

export function PortfolioCard({ portfolio }: IPortfolioCardProps) {

  const history = useHistory();
  const handleEditClick = (e: ClickEvent) => {
    e.stopPropagation();
    history.push(`/portfolios/details/${portfolio.id}`);
  }

  return (<div className={css.portfolioCard}>
    <span>{portfolio.name}</span>
    <Button cx={css.editButton} icon={EditIcon} color="secondary" fill="ghost" onClick={handleEditClick} />
  </div>)
}