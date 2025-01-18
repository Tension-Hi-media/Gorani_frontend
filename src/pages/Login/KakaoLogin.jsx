import React from 'react';

const KakaoLogin = () => {
    const handleKakaoLogin = () => {
        const clientId = process.env.REACT_APP_KAKAO_ID;
        const redirectUri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
        const scope = 'profile_nickname,account_email,name';
        const authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
        
        console.log('KAKAO_ID:', clientId);
        window.location.href = authUrl; // 카카오 인증 화면으로 리다이렉트
    };

    return (
        <button className="login-button kakao" onClick={handleKakaoLogin}>
        Kakao 계정으로 로그인
      </button>
    );
};

export default KakaoLogin;
