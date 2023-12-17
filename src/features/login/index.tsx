/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { CLIENT_ID } from '../../envConstants';
import { useSearchParams } from 'react-router-dom';

const Login = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  //  console.log(searchParam.get("code"))

  function loginWithGithub() {
    window.location.assign(
      'https://github.com/login/oauth/authorize?client_id=' + CLIENT_ID
    );
  }

  return (
    <div>
      <button onClick={loginWithGithub}>Login Witth Github</button>
    </div>
  );
};

export default Login;
