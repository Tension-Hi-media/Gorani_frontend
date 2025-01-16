import React from "react";

const NaverLogin = () => {
  const handleNaverLogin = () => {
    window.location.href = 'http://localhost:8080/auth/login/naver';
  };

  return (
    <div>
      <h2>네이버 로그인</h2>
      <button onClick={handleNaverLogin}>로그인하기</button>
    </div>
  );
};

export default NaverLogin;
