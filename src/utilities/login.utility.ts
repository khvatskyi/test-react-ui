
export const redirectToSSO = () => {
  const url = `${process.env.REACT_APP_SSO_ACCESS_URL}/auth/realms/plusx/protocol/openid-connect/auth?response_type=code&client_id=${process.env.REACT_APP_SSO_CLIENT_ID}&scope=${process.env.REACT_APP_SSO_SCOPE}&redirect_uri=${process.env.REACT_APP_SSO_REDIRECT_URI}`;
  window.location.href = url;
};
