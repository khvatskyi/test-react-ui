import '@epam/uui-components/styles.css';
import '@epam/uui/styles.css';
import '@epam/assets/css/theme/theme_electric.css';
import './index.module.scss';
import AppMainMenuComponent from './components/MainMenu';
import LoginVerificationComponent from './components/LoginVerification';

import { createRoot } from 'react-dom/client';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch } from 'react-router-dom';
import { DragGhost, HistoryAdaptedRouter, useUuiServices, UuiContext } from '@epam/uui-core';
import { ErrorHandler } from '@epam/uui';
import { Modals, Snackbar } from '@epam/uui-components';
import { svc } from './services';

import { MainPage } from './pages/MainPage';
import { ChatRoom } from './pages/chat-room/ChatRoom';
import { ClientProfileDetails } from './pages/client-profile/ClientProfile';
import { PortfoliosPage } from './pages/portfolios/Portfolios';
import { PortfolioDetails } from './pages/portfolioDetails/PortfolioDetails';

import { Provider } from 'react-redux'
import { store } from './store';
import { useAppSelector } from './hooks';
import { selectIsDataLoading } from './store/data.slice';
import DataLoading from './components/DataLoading';

const history = createBrowserHistory();
const router = new HistoryAdaptedRouter(history);

function UuiEnhancedApp() {
  const { services } = useUuiServices({ router });
  const isLoading = useAppSelector(selectIsDataLoading);

  Object.assign(svc, services);
  return (
    <UuiContext.Provider value={services}>
      <ErrorHandler>
        {isLoading && <DataLoading />}
        <Router history={history}>
          <AppMainMenuComponent />
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route path='/chat-room' component={ChatRoom} />
            <Route path='/login/sso-verification' component={LoginVerificationComponent} />
            <Route path='/client-profile' component={ClientProfileDetails} />
            <Route exact path='/portfolios' component={PortfoliosPage} />
            <Route exact path='/portfolios/create' component={PortfolioDetails} />
            <Route exact path='/portfolios/details/:id' component={PortfolioDetails} />
          </Switch>
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
    <Provider store={store}>
      <UuiEnhancedApp />
    </Provider>
  );
}

initApp();
