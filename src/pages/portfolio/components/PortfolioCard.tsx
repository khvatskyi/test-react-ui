import css from './PortfolioCard.module.scss';
import { ReactComponent as EditIcon } from '@epam/assets/icons/content-edit-fill.svg';
import { Button } from '@epam/uui';

interface ISimplePortfolio {
  id: number;
  name: string;
}

interface IPortfolioCardProps {
  portfolio: ISimplePortfolio
}

type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

export function PortfolioCard({ portfolio }: IPortfolioCardProps) {

  const handleEditClick = (e: ClickEvent) => {
    e.stopPropagation();
    alert(portfolio.name + ' clicked!');
  }

  return (<div className={css.portfolioCard}>
    <span>{portfolio.name}</span>
    <Button cx={css.editButton} icon={EditIcon} color="secondary" fill="ghost" onClick={handleEditClick} />
  </div>)
}