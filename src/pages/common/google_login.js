import React from "react";

const GoogleLogin = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/auth/login/google'; // 구글 로그인 요청 URL
  };

  return (
    <div>
      <h2>구글 로그인</h2>
      <button onClick={handleGoogleLogin}>로그인하기</button>
    </div>
  );
};

export default GoogleLogin;
