import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const responseGoogle = (response) => {
  console.log(response);
  // 로그인 성공 시 처리할 로직 추가
};

const GoogleLoginComponent = () => {
  return (
    <GoogleLogin
      onSuccess={responseGoogle}
      onError={() => console.log('Google Login Error')}
    />
  );
};

export default GoogleLoginComponent;
