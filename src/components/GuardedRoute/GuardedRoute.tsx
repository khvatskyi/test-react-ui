import { Route, Redirect, RouteProps } from 'react-router-dom';

export interface IGuardedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  canActivate: boolean;
}

const GuardedRoute = ({ component: ComponentToRender, canActivate, ...rest }: IGuardedRouteProps) => (
  <Route {...rest} render={(props) => (
    canActivate
      ? <ComponentToRender {...props} />
      : <Redirect to='/' />
  )} />
);

export default GuardedRoute;