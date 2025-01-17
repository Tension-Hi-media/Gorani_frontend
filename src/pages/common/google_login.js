import React from "react";

const GoogleLoginComponent = () => {
  const handleGoogleLogin = () => {
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;

    if (!clientId || !redirectUri) {
      console.error("Google Client ID 또는 Redirect URI가 설정되지 않았습니다.");
      alert("Google 로그인 설정이 잘못되었습니다. 관리자에게 문의하세요.");
      return;
    }

    const state = encodeURIComponent(Math.random().toString(36).substring(2)); // 랜덤 state 생성
    sessionStorage.setItem("google_auth_state", state); // state를 세션 스토리지에 저장

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid%20profile%20email&state=${state}`;
    
    console.log("Google Auth URL:", authUrl); // 디버깅용
    window.location.href = authUrl; // 구글 로그인 페이지로 리다이렉션
  };

  return (

    <button className="login-button google" onClick={handleGoogleLogin}>
    Google 계정으로 로그인
  </button>

  );
};

export default GoogleLoginComponent;
