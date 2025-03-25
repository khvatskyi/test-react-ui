import { useHistory } from 'react-router-dom';

import { ReactComponent as MenuIcon } from '@epam/assets/icons/common/navigation-more_vert-18.svg';
import { ReactComponent as EditIcon } from '@epam/assets/icons/content-edit-fill.svg';
import { ReactComponent as DeleteIcon } from '@epam/assets/icons/action-delete-outline.svg';
import { Button, ControlGroup, Dropdown, DropdownMenuBody, DropdownMenuButton, RichTextView } from '@epam/uui';

import { IPortfolio } from '../../../../typings/models/portfolio.models';
import css from './PortfolioCard.module.scss';
import { useAppDispatch } from '../../../../hooks';
import { setBackUrl } from '../../../../store/app.slice';
import { DropdownBodyProps, useUuiContext } from '@epam/uui-core';
import { deletePortfolio } from '../../../../store/data.slice';
import { DeleteConfirmation } from '../../../../components/DeleteConfirmation/DeleteConfirmation';

export interface IPortfolioCardProps {
  portfolio: IPortfolio
}

type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>;

export default function PortfolioCard({ portfolio }: IPortfolioCardProps) {
  
  const { uuiModals } = useUuiContext();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleEditClick = (e: ClickEvent) => {
    e.stopPropagation();
    dispatch(setBackUrl(window.location.pathname));
    history.push(`/portfolio/details/${portfolio.id}`);
  }
  
  const handleDeleteClick = (e: ClickEvent) => {
    e.stopPropagation();

    const message_element = 
      <RichTextView size='16'>
        <span>Do you really want to delete all data for the </span>
        {' '}<b>[{portfolio.name}]</b>{' '}
        <span>portfolio?</span>
      </RichTextView>

    uuiModals.show<boolean>((modalProps) => <DeleteConfirmation { ...modalProps } element={message_element} />)
      .then(() => {
        dispatch(deletePortfolio(portfolio.id));
      })
      .catch(() => {});
  }
  
  const handleOpenClick = (e: ClickEvent) => {
    e.stopPropagation();
    history.push(`/portfolio/stages/${portfolio.id}`);
  }

  const renderThirdDropdownBody = (props: DropdownBodyProps) => {
    return (
        <DropdownMenuBody { ...props } rawProps={ { style: { padding: 0 } } }>
            <DropdownMenuButton cx={css.editIcon} caption="Edit" icon={ EditIcon } onClick={handleEditClick} />
            <DropdownMenuButton cx={css.deleteIcon} caption="Delete" icon={ DeleteIcon } onClick={handleDeleteClick} />
        </DropdownMenuBody>
    );
  };


  return (
    <div className={css.portfolioCard} >
      <div className={css.title} onClick={handleOpenClick} >
        <span>{validateText(portfolio.name)}</span>
      </div>
      <ControlGroup>
        <Dropdown
          renderBody={ renderThirdDropdownBody }
          renderTarget={ (props) => <Button { ...props } cx={css.editButton} color='secondary' fill="ghost" icon={ MenuIcon } size="36" isDropdown={ false } /> }
          placement="bottom-end"
        />  
      </ControlGroup>
    </div>
  )
}

function validateText(text: string) {
  if (text.length > 50) {
    return text.substring(0, 50) + '...';
  }
  return text;
}