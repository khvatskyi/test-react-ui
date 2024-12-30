import { Route, Router, Switch } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history';

import { DragGhost, HistoryAdaptedRouter, useUuiServices, UuiContext } from '@epam/uui-core';
import '@epam/uui-components/styles.css';
import '@epam/uui/styles.css';
import '@epam/assets/css/theme/theme_electric.css';
import { Modals, Snackbar } from '@epam/uui-components';
import LoginVerification from './components/LoginVerification/LoginVerification';

import './index.module.scss';
import { ErrorHandler } from '@epam/uui';
import { svc } from './services';

import { DataLoading, MainMenu } from './components';
import {
  ChatRoom,
  ClientProfile,
  MainPage,
  PortfolioDetails,
  Portfolios
} from './pages';
import { store } from './store';
import { useAppSelector } from './hooks';
import { selectIsDataLoading } from './store/data.slice';

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
          <MainMenu />
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route path='/interactive-chat' component={ChatRoom} />
            <Route path='/login/sso-verification' component={LoginVerification} />
            <Route path='/profile' component={ClientProfile} />
            <Route exact path='/portfolios' component={Portfolios} />
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
