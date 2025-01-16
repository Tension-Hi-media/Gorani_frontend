import React from "react";

const NaverLogin = () => {
  const handleNaverLogin = () => {
    const clientId = process.env.REACT_APP_NAVER_CLIENT_ID; // 네이버 클라이언트 ID
    const redirectUri = process.env.REACT_APP_NAVER_REDIRECT_URI; // 리디렉션 URI
    const authUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=1234`;

    window.location.href = authUrl; // 구글 로그인 페이지로 리디렉션
  };

  return (
    <div>
      <h2>네이버 로그인</h2>
      <button onClick={handleNaverLogin}>로그인하기</button>
    </div>
  );
};

export default NaverLogin;
