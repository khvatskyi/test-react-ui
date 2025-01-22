import { Route, Router, Switch } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history';

import { DragGhost, HistoryAdaptedRouter, useUuiServices, UuiContext } from '@epam/uui-core';
import '@epam/uui-components/styles.css';
import '@epam/uui/styles.css';
import '@epam/assets/css/theme/theme_electric.css';
import { Modals, Snackbar } from '@epam/uui-components';
import { ErrorHandler } from '@epam/uui';

import './index.module.scss';
import { LoginVerification } from './components';
import { svc } from './services';

import { DataLoading, GuardedRoute, MainMenu } from './components';
import {
  ChatRoom,
  ClientProfile,
  MainPage,
  PortfolioStages,
  PortfolioDetails,
  Portfolios,
  Framework
} from './pages';
import { store } from './store';
import { useAppSelector } from './hooks';
import { selectIsDataLoading } from './store/data.slice';
import { selectUserContext } from './store/session.slice';

const history = createBrowserHistory();
const router = new HistoryAdaptedRouter(history);

function UuiEnhancedApp() {
  const { services } = useUuiServices({ router });
  const isLoading = useAppSelector(selectIsDataLoading);
  const userContext = useAppSelector(selectUserContext);
  const hasProfile = Boolean(userContext?.hasProfile);

  Object.assign(svc, services);
  return (
    <UuiContext.Provider value={services}>
      <ErrorHandler>
        {isLoading && <DataLoading />}
        <Router history={history}>
          <MainMenu />
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route path='/login/sso-verification' component={LoginVerification} />
            <GuardedRoute path='/profile' component={ClientProfile} canActivate={!!userContext} />
            <GuardedRoute exact path='/portfolios' component={Portfolios} canActivate={hasProfile} />
            <GuardedRoute exact path='/portfolios/create' component={PortfolioDetails} canActivate={hasProfile} />
            <GuardedRoute exact path='/portfolio/details/:id' component={PortfolioDetails} canActivate={hasProfile} />
            <GuardedRoute exact path='/portfolio/stages/:id' component={PortfolioStages} canActivate={hasProfile} />
            <GuardedRoute exact path='/framework' component={Framework} canActivate={hasProfile} />
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
