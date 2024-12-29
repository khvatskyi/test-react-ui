import cx from 'classnames';

import {
  BurgerButton, GlobalMenu, MainMenu as EpamMainMenu, MainMenuAvatar, MainMenuButton, MainMenuIcon, FlexSpacer, FlexCell, DropdownMenuButton,
  DropdownMenuBody, Burger, IconContainer, Dropdown, Anchor
} from '@epam/uui';
import { AdaptiveItemProps, MainMenuCustomElement } from '@epam/uui-components';
import { ReactComponent as HelpIcon } from '@epam/assets/icons/common/notification-help-outline-24.svg';

import css from './MainMenu.module.scss';
import { selectUserContext } from '../../store/session.slice';
import { useAppSelector } from '../../hooks';
import { ReactComponent as LogoIcon } from '../../assets/icons/logo.svg';

interface IRenderProps {
  id: string;
}

export default function MainMenu() {
  const userContext = useAppSelector(selectUserContext);
  const isUserContextPresent = Boolean(userContext?.accessToken);
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
            <DropdownMenuButton caption='Profile' />
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
            <Anchor link={{ pathname: '/' }} href='/' >
              <IconContainer icon={LogoIcon} cx={cx(css.icon, css.logo)} />
            </Anchor>
          </MainMenuCustomElement>
        )
      }
    );

    // if (isUserContextPresent) { //development mode :)
      items.push(
        {
          id: 'chatRoom', priority: 3,
          render: (p: IRenderProps) => <MainMenuButton key={p.id} href='/chat-room' caption='Chat Room' />
        },
        {
          id: 'client-profile', priority: 3,
          render: (p: IRenderProps) => <MainMenuButton key={p.id} href='/client-profile' caption='Client Profile' />
        },
        {
          id: 'portfolio', priority: 3,
          render: (p: IRenderProps) => <MainMenuButton key={p.id} href='/portfolios' caption='Portfolios' />
        }
      );
    // }
    
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
          onClick={() => {
            const url = `${process.env.REACT_APP_SSO_ACCESS_URL}/auth/realms/plusx/protocol/openid-connect/auth?response_type=code&client_id=${process.env.REACT_APP_SSO_CLIENT_ID}&scope=${process.env.REACT_APP_SSO_SCOPE}&redirect_uri=${process.env.REACT_APP_SSO_REDIRECT_URI}`;
            window.location.href = url;
          }}
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