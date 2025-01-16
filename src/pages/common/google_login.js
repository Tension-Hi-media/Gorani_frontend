import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const GoogleLoginComponent = () => {
  const responseGoogle = (response) => {
    console.log(response.credential); // Google에서 받은 JWT 토큰

    // 백엔드로 토큰 전달
    fetch('http://localhost:8080/auth/google/callback', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: response.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('로그인 성공:', data);
        // 세션 저장 또는 UI 업데이트
      })
      .catch((err) => console.error('로그인 실패:', err));
  };

  return (
    <GoogleLogin
      onSuccess={responseGoogle}
      onError={() => console.log('Google Login Error')}
    />
  );
};

export default GoogleLoginComponent;
