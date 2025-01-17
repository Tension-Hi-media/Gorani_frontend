import React from "react";

const KakaoLogin = () => {
    const handleKakaoLogin = () => {
        const clientId = process.env.REACT_APP_KAKAO_ID;
        const redirectUri = 'http://localhost:3000/kakaoSuccess'; // 메인으로
        const scope = 'profile_nickname,account_email';
        const authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    
        console.log('KAKAO_ID:', process.env.REACT_APP_KAKAO_ID);
        window.location.href = authUrl;
    };



    // code 파라미터가 없으면 로그인 버튼을 보여줌
    return (
        <div>
            <button className="login-button kakao" onClick={handleKakaoLogin}>
                Kakao 계정으로 로그인
            </button>
        </div>
    );
};

export default KakaoLogin;