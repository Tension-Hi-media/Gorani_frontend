import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const KakaoLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();

    console.log("🦝🦝🦝🦝",location )

    useEffect(() => {
        // URL에서 인증 코드 확인
        const params = new URLSearchParams(location.search);
        const code = params.get("code");

        console.log("URL에서 가져온 code:", code);  // 코드가 잘 나오나 확인

        if (code) {
            console.log("Authorization Code:", code);
            
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            };

            axios
                .get(`http://localhost:8080/auth/kakao/callback?code=${code}`, config)
                .then((response) => {
                    console.log("Response Data:", response.data);
                    console.log("Response Status:", response.status);
                    console.log("Response Headers:", response.headers);
                    navigate("/kakaoSuccess");
                })
                .catch((error) => {
                    if (error.response) {
                        console.error("Error Response Data:", error.response.data);
                        console.error("Error Response Status:", error.response.status);
                        console.error("Error Response Headers:", error.response.headers);
                    } else if (error.request) {
                        console.error("Error Request:", error.request);
                    } else {
                        console.error("Error Message:", error.message);
                    }
                    console.error("Error Config:", error.config);
                });
        }
    }, [navigate, location]);

    const handleKakaoLogin = () => {
        const clientId = process.env.REACT_APP_KAKAO_ID;
        const redirectUri = 'http://localhost:3000/kakao'; // 메인으로
        const scope = 'profile_nickname,account_email';
        const authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    
        console.log('KAKAO_ID:', process.env.REACT_APP_KAKAO_ID);
        window.location.href = authUrl;
    };

    // URL에 code 파라미터가 있으면 로그인 처리 중 화면을 보여줌
    if (location.search.includes('code=')) {
        return (
            <div>
                <p>카카오 로그인 처리 중...</p>
            </div>
        );
    }

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