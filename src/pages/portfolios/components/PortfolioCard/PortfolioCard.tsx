import { useHistory } from 'react-router-dom';

import { ReactComponent as EditIcon } from '@epam/assets/icons/content-edit-fill.svg';
import { Button } from '@epam/uui';

import { IPortfolio } from '../../../../typings/models/portfolio.models';
import css from './PortfolioCard.module.scss';

export interface IPortfolioCardProps {
  portfolio: IPortfolio
}

type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

export default function PortfolioCard({ portfolio }: IPortfolioCardProps) {

  const history = useHistory();
  const handleEditClick = (e: ClickEvent) => {
    e.stopPropagation();
    history.push(`/portfolio/details/${portfolio.id}`);
  }
  const handleOpenClick = (e: ClickEvent) => {
    e.stopPropagation();
    history.push(`/portfolio/stages/${portfolio.id}`);
  }

  return (
    <div className={css.portfolioCard} onClick={handleOpenClick}>
      <span>{portfolio.name}</span>
      <Button cx={css.editButton} icon={EditIcon} color='secondary' fill='ghost' onClick={handleEditClick} />
    </div>
  )
}