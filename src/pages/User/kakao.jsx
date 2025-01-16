import React from "react";

const KakaoLogin = () => {
    const handleKakaoLogin = () => {
        const clientId = process.env.REACT_APP_KAKAO_ID;
        const redirectUri = 'http://localhost:8080/auth/kakao/callback'; // 리디렉션 URI
        const scope = 'profile_nickname,account_email'; // 요청할 권한
        const authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    
        window.location.href = authUrl;
    
        console.log('KAKAO_ID:', process.env.REACT_APP_KAKAO_ID);
    };

  return (
    <div>
        <button className="login-button kakao" onClick={handleKakaoLogin}>
          Kakao 계정으로 로그인
        </button>
    </div>
  );
};

export default KakaoLogin;
