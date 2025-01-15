import React from "react";

const NaverLogin = () => {
  const handleNaverLogin = () => {
    // 서버 사이드로 이동만 하면 됨 (GET /api/login/naver)
    // 서버가 알아서 네이버 로그인 페이지로 302 Redirect
    window.location.href = "http://localhost:8080/api/login/naver";
  };

  return (
    <div>
      <h2>네이버 로그인</h2>
      <button onClick={handleNaverLogin}>로그인하기</button>
    </div>
  );
};

export default NaverLogin;
