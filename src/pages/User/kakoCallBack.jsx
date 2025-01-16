import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const KakaoLoginCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        console.log("지금 보내는 중")
        
        if (code) {
            axios.get(`/auth/kakao/callback?code=${code}`)
            // axios.get(`/auth/kakao/callback`)

                .then(response => {
                    console.log("로그인 성공:", response.data);
                    navigate('/kakaoSuccess');  // 성공 페이지로 이동
                })
                .catch(error => {
                    console.error("로그인 실패:", error);

                });
        }
    }, [navigate]);

    return (
        <div>
            <p>카카오 로그인 처리 중...</p>
        </div>
    );
};

export default KakaoLoginCallback;
