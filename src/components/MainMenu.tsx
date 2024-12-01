import { BurgerButton, GlobalMenu, MainMenu, MainMenuAvatar, MainMenuButton, MainMenuIcon, FlexSpacer, FlexCell, DropdownMenuButton, DropdownMenuBody, Burger } from '@epam/uui';
import { Dropdown, AdaptiveItemProps, MainMenuLogo } from '@epam/uui-components';
import { ReactComponent as HelpIcon } from '@epam/assets/icons/common/notification-help-outline-24.svg';
import { access_sso } from '../environments/environment';
import { selectUserContext } from '../store/session.state';
import { useAppSelector } from '../hooks';

interface RenderProps {
    id: string;
}

  export default function AppMainMenuComponent() {
        const userContext = useAppSelector(selectUserContext);
        const isUserContextPresent = userContext && userContext.accessToken;
        const renderBurger = (props: { onClose: () => void }) => (
        <>
            <BurgerButton
                href="/"
                caption="Welcome page"
                onClick={ () => {
                    props.onClose && props.onClose();
                } }
            />
            <BurgerButton
                href="/"
                caption="Help"
                onClick={ () => {
                    props.onClose && props.onClose();
                } }
            />
            <BurgerButton
                href="/"
                caption="Log out"
                onClick={ () => {
                    props.onClose && props.onClose();
                } }
            />
        </>
    );

    const renderAvatar = () => {
        return (
            <Dropdown
                key="avatar"
                renderTarget={ (props) => (
                    <MainMenuAvatar avatarUrl={userContext!.picture} isDropdown { ...props } />
                ) }
                renderBody={ (props) => (
                    <DropdownMenuBody { ...props }>
                        <DropdownMenuButton caption="Profile" />
                    </DropdownMenuBody>
                ) }
                placement="bottom-end"
            />
        );
    };

    const getMenuItems = (): AdaptiveItemProps[] => {
        const items = [];
    
        items.push({
            id: 'burger', priority: 100, collapsedContainer: true, 
            render: (p: RenderProps) => <Burger key={ p.id } width={ 300 } renderBurgerContent={ renderBurger } />,
        });
        items.push({
            id: 'logo', priority: 99,
            render: (p: RenderProps) => <MainMenuLogo key={ p.id } href="/" logoUrl="/icons/ai-copilot_magic-fill.svg" />,
        });
        items.push({
            id: 'welcomePage', priority: 3, 
            render: (p: RenderProps) => <MainMenuButton key={ p.id } href="/" caption="Welcome page" />,
        });
        if (isUserContextPresent) {
            items.push({
                id: 'chatRoom', priority: 3, 
                render: (p: RenderProps) => <MainMenuButton key={ p.id } href="/chat-room" caption="Chat Room" />,
            });
        }
        items.push({
            id: 'flexSpacer', priority: 100, 
            render: (p: RenderProps) => <FlexSpacer key={ p.id } />,
        });
        if (isUserContextPresent) {
            items.push({
                id: 'avatar', priority: 2, 
                render: renderAvatar,
            });
        } else {
            items.push({
                id: 'login', priority: 3, 
                render: (p: RenderProps) => <MainMenuButton 
                    key={ p.id } 
                    caption="Login" 
                    onClick={ () => {
                        const url = `${process.env.REACT_APP_SSO_ACCESS_URL}/auth/realms/plusx/protocol/openid-connect/auth?response_type=code&client_id=${access_sso.CLIENT_ID}&scope=${access_sso.SCOPE}&redirect_uri=${process.env.REACT_APP_SSO_REDIRECT_URI}`;
                        window.location.href = url;
                    }}
                />
            });
        }
        items.push({
            id: 'help', priority: 1, 
            render: (p: RenderProps) => <MainMenuIcon key={ p.id } href="https://support.epam.com" target="_blank" icon={ HelpIcon } />,
        });
        items.push({
            id: 'globalMenu', priority: 100, 
            render: (p: RenderProps) => <GlobalMenu key={ p.id } />,
        });

        return items;
    };

    return (
        <FlexCell grow={ 1 }>
            <MainMenu items={ getMenuItems() } />
        </FlexCell>
    );
}