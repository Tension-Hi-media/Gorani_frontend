import React from "react";

const GoogleLoginComponent = () => {
  const handleGoogleLogin = () => {
    const clientId = '800620068616-3ghg401p0pmbv8h1hj84qlj45qmkpgli.apps.googleusercontent.com'; // 구글 클라이언트 ID
    const redirectUri = 'http://localhost:3000/google/success';
    const state = encodeURIComponent(Math.random().toString(36).substring(7));  // 보안을 위한 랜덤 상태값 생성
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid%20profile%20email&state=${state}`;

    window.location.href = authUrl; // 구글 로그인 페이지로 리디렉션
  };

  return (
    <div>
      <h2>구글 로그인</h2>
      <button onClick={handleGoogleLogin}>로그인하기</button>
    </div>
  );
};

export default GoogleLoginComponent;
