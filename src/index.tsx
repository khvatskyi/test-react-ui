import '@epam/uui-components/styles.css';
import '@epam/uui/styles.css';
import '@epam/assets/theme/theme_loveship.scss';
import './index.module.scss';
import AppMainMenu from "./components/MainMenu";

import { StrictMode } from "react";
import { createRoot } from 'react-dom/client';
import { createBrowserHistory } from "history";
import { Route, Router } from "react-router-dom";
import { DragGhost, HistoryAdaptedRouter, useUuiServices, UuiContext } from "@epam/uui-core";
import { ErrorHandler } from "@epam/uui";
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
                    <Route component={AppMainMenu} />
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
