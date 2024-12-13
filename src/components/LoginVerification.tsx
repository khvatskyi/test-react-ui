import { useLocation } from 'react-router-dom';
import { signInWithSSOCode } from '../store/session.slice';
import { useAppDispatch } from '../hooks';

const LoginVerificationComponent = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const authCode = queryParams.get('code');
  if (authCode) {
    dispatch(signInWithSSOCode(authCode));
  }

  return <></>;
};

export default LoginVerificationComponent;