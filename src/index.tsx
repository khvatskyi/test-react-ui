import '@epam/uui-components/styles.css';
import '@epam/uui/styles.css';
import '@epam/assets/theme/theme_loveship.scss';
import './index.module.scss';

import logo from "./icons/logo.svg";
//
import { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import { createBrowserHistory } from "history";
import { Route, Router } from "react-router-dom";
import { DragGhost, HistoryAdaptedRouter, useUuiServices, UuiContext } from "@epam/uui-core";
import { MainMenu, MainMenuButton, ErrorHandler, BurgerButton } from "@epam/uui";
import { Modals, Snackbar } from "@epam/uui-components";
import { svc } from "./services";

import { MainPage } from "./pages/MainPage";
import { ChatRoom } from './pages/chat-room/ChatRoom';

import { Provider } from 'react-redux'
import { store } from './store';

const history = createBrowserHistory();
const router = new HistoryAdaptedRouter(history);

function UuiEnhancedApp() {
    const { services } = useUuiServices({ router });
    Object.assign(svc, services);
    return (
        <UuiContext.Provider value={services}>
            <ErrorHandler>
                <Router history={history}>
                    <Route>
                        <MainMenu appLogoUrl={logo}>
                            <MainMenuButton
                                caption="Home"
                                link={{ pathname: '/' }}
                                priority={1}
                                estimatedWidth={72}
                            />
                            <MainMenuButton
                                caption="Login"
                                link={{ pathname: '/chat-room' }}
                                priority={2}
                                estimatedWidth={72}
                            />

                            {/* <BurgerButton icon={ GitIcon } caption="Github" href={ GIT_LINK } target="_blank" /> */}
                        </MainMenu>
                    </Route>
                    <Route exact path="/" component={MainPage} />
                    <Route path="/chat-room" component={ChatRoom} />
                </Router>
                <Snackbar />
                <Modals />
                <DragGhost />
            </ErrorHandler>
        </UuiContext.Provider>

    );
}

function initApp() {
    const root = createRoot(window.document.getElementById('root') as Element);
    root.render(
        <StrictMode>
            <Provider store={store}>
                <UuiEnhancedApp />
            </Provider>
        </StrictMode>
    );
}

initApp();
