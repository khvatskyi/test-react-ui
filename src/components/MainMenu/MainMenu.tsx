import cx from 'classnames';

import {
  BurgerButton, GlobalMenu, MainMenu as EpamMainMenu, MainMenuAvatar, MainMenuButton, MainMenuIcon, FlexSpacer, FlexCell, DropdownMenuButton,
  DropdownMenuBody, Burger, IconContainer, Dropdown, Anchor, DropdownMenuSplitter
} from '@epam/uui';
import { AdaptiveItemProps, MainMenuCustomElement } from '@epam/uui-components';
import { ReactComponent as HelpIcon } from '@epam/assets/icons/common/notification-help-outline-24.svg';

import css from './MainMenu.module.scss';
import { clearUserContext, selectUserContext } from '../../store/session.slice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { ReactComponent as LogoIcon } from '../../assets/icons/logo.svg';
import { useHistory } from 'react-router-dom';

interface IRenderProps {
  id: string;
}

export default function MainMenu() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const userContext = useAppSelector(selectUserContext);
  const isUserContextPresent = Boolean(userContext?.accessToken);
  const showContextMenuItems = Boolean(userContext?.accessToken && userContext?.hasProfile);

  const handleLogout = () => {
    dispatch(clearUserContext());
    history.push('');
  }

  const renderBurger = (props: { onClose: () => void }) => (
    <>
      <BurgerButton
        href='/'
        caption='Welcome page'
        onClick={() => {
          props.onClose && props.onClose();
        }}
      />
      <BurgerButton
        href='/'
        caption='Help'
        onClick={() => {
          props.onClose && props.onClose();
        }}
      />
      <BurgerButton
        href='/'
        caption='Log out'
        onClick={() => {
          props.onClose && props.onClose();
        }}
      />
    </>
  );

  const renderAvatar = () => {
    return (
      <Dropdown
        key='avatar'
        renderTarget={(props) => (
          <MainMenuAvatar avatarUrl={userContext!.picture} isDropdown {...props} />
        )}
        renderBody={(props) => (
          <DropdownMenuBody {...props}>
            <DropdownMenuButton caption='Profile' link={ { pathname: '/profile' } } />
            <DropdownMenuSplitter />
            <DropdownMenuButton caption='Log out' onClick={handleLogout} />
          </DropdownMenuBody>
        )}
        placement='bottom-end'
      />
    );
  };

  const getMenuItems = (): AdaptiveItemProps[] => {
    const items: AdaptiveItemProps[] = [];

    items.push(
      {
        id: 'burger', priority: 100, collapsedContainer: true,
        render: (p: IRenderProps) => <Burger key={p.id} width={300} renderBurgerContent={renderBurger} />
      },
      {
        id: 'logo',
        priority: 99,
        render: () => (
          <MainMenuCustomElement key='logo'>
            <Anchor link={{ pathname: '/' }}>
              <IconContainer icon={LogoIcon} cx={cx(css.icon, css.logo)} />
            </Anchor>
          </MainMenuCustomElement>
        )
      }
    );

    const redirectToSSO = () => {
      const url = `${process.env.REACT_APP_SSO_ACCESS_URL}/auth/realms/plusx/protocol/openid-connect/auth?response_type=code&client_id=${process.env.REACT_APP_SSO_CLIENT_ID}&scope=${process.env.REACT_APP_SSO_SCOPE}&redirect_uri=${process.env.REACT_APP_SSO_REDIRECT_URI}`;
      window.location.href = url;
    };

    if (showContextMenuItems) {
      items.push(
        {
          id: 'interactiveChat', priority: 3,
          render: (p: IRenderProps) => <MainMenuButton key={p.id} link={ { pathname: '/interactive-chat' } } caption='Interactive Chat' />
        },
        {
          id: 'portfolios', priority: 3,
          render: (p: IRenderProps) => <MainMenuButton key={p.id} link={ { pathname: '/portfolios' } } caption='Portfolios' />
        }
      );
    }
    
    items.push(
      {
        id: 'flexSpacer', priority: 100,
        render: (p: IRenderProps) => <FlexSpacer key={p.id} />,
      },
      {
        id: 'help', priority: 1, 
        render: (p: IRenderProps) => <MainMenuIcon key={ p.id } href='https://support.epam.com' target='_blank' icon={ HelpIcon } />,
      }
    );

    if (isUserContextPresent) {
      items.push({
        id: 'avatar', priority: 2,
        render: renderAvatar,
      });
    } else {
      items.push({
        id: 'login', priority: 3,
        render: (p: IRenderProps) => <MainMenuButton
          key={p.id}
          caption='Login'
          onClick={redirectToSSO}
        />
      });
    }
    items.push({
      id: 'globalMenu', priority: 100,
      render: (p: IRenderProps) => <GlobalMenu key={p.id} />,
    });

    return items;
  };

  return (
    <FlexCell grow={1}>
      <EpamMainMenu items={getMenuItems()} />
    </FlexCell>
  );
}