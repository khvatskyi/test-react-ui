import { useLocation } from 'react-router-dom';

import { signInWithSSOCode } from '../../store/session.slice';
import { useAppDispatch } from '../../hooks';

export default function LoginVerification() {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const authCode = queryParams.get('code');
  if (authCode) {
    dispatch(signInWithSSOCode(authCode));
  }

  return <></>;
};
