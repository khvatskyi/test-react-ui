import React from 'react';
import { BurgerButton, GlobalMenu, MainMenu, MainMenuAvatar, MainMenuButton, MainMenuIcon, FlexSpacer, FlexCell, DropdownMenuButton, DropdownMenuSplitter, DropdownMenuBody, Burger } from '@epam/uui';
import { Dropdown, AdaptiveItemProps, MainMenuLogo } from '@epam/uui-components';
import { ReactComponent as HelpIcon } from '@epam/assets/icons/common/notification-help-outline-24.svg';

  export default function AppMainMenu() {
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
                    <MainMenuAvatar avatarUrl="https://api.dicebear.com/7.x/pixel-art/svg?seed=Coco&radius=50&backgroundColor=b6e3f4" isDropdown { ...props } />
                ) }
                renderBody={ (props) => (
                    <DropdownMenuBody { ...props }>
                        <DropdownMenuButton caption="Settings" />
                        <DropdownMenuSplitter />
                        <DropdownMenuButton caption="Log out" />
                    </DropdownMenuBody>
                ) }
                placement="bottom-end"
            />
        );
    };

    const getMenuItems = (): AdaptiveItemProps[] => {
        return [
            {
                id: 'burger', priority: 100, collapsedContainer: true, render: (p) => <Burger key={ p.id } width={ 300 } renderBurgerContent={ renderBurger } />,
            },
            {
                id: 'logo',
                priority: 99,
                render: (p) => <MainMenuLogo key={ p.id } href="/" logoUrl="/icons/ai-copilot_magic-fill.svg" />,
            },
            { id: 'welcomePage', priority: 3, render: (p) => <MainMenuButton key={ p.id } href="/" caption="Welcome page" /> },
            { id: 'flexSpacer', priority: 100, render: (p) => <FlexSpacer key={ p.id } /> },
            { id: 'login', priority: 3, render: (p) => <MainMenuButton key={ p.id } href="/chat-room" caption="Login" /> },
            { id: 'help', priority: 1, render: (p) => <MainMenuIcon key={ p.id } href="https://support.epam.com" target="_blank" icon={ HelpIcon } /> },
            { id: 'avatar', priority: 2, render: renderAvatar },
            { id: 'globalMenu', priority: 100, render: (p) => <GlobalMenu key={ p.id } /> },
        ];
    };

    return (
        <FlexCell grow={ 1 }>
            <MainMenu items={ getMenuItems() } />
        </FlexCell>
    );
}