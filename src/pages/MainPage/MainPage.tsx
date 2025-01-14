import css from './MainPage.module.scss';
import { ReactComponent as LoginImage } from '../../assets/icons/login-icon.svg';

import { Button, IconContainer } from '@epam/uui';

import { useAppSelector } from "../../hooks";
import { selectUserContext } from "../../store/session.slice";

export default function MainPage() {

  const userContext = useAppSelector(selectUserContext);
  const isUserContextPresent = Boolean(userContext?.accessToken);

  const redirectToSSO = () => {
    const url = `${process.env.REACT_APP_SSO_ACCESS_URL}/auth/realms/plusx/protocol/openid-connect/auth?response_type=code&client_id=${process.env.REACT_APP_SSO_CLIENT_ID}&scope=${process.env.REACT_APP_SSO_SCOPE}&redirect_uri=${process.env.REACT_APP_SSO_REDIRECT_URI}`;
    window.location.href = url;
  };

  const login = (
    <div className={css.loginWrapper}>
      <IconContainer cx={css.iconWrapper} icon={LoginImage} />
      <h2>API Producer Copilot</h2>
      <Button caption='Login' onClick={redirectToSSO} color='primary' />
    </div>
  )

  return (
    <div className={css.root}>
      {
        !isUserContextPresent ? login
          : (
            //TODO: need to implemet Welcome Page
            // <main>
            //     <div className={css.bgImg}>
            //         <IconContainer icon={CopilotImage} />
            //     </div>
            //     <Panel cx={css.mainPanel}>
            //         <RichTextView size='14'>
            //             <h1>API Producer Copilot​</h1>
            //         </RichTextView>
            //     </Panel>
            // </main>
            // <div></div>
            <></>
          )
      }
    </div>
  );
}
