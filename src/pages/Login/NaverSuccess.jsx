// src/components/NaverSuccess.jsx
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { naverLogin } from '../../Apis/UserAPI'; // 방금 만든 naverLogin 함수

const NaverSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        const state = params.get('state');

        console.log('Received code:', code);
        console.log('Received state:', state);

        if (code && state) {
            // 백엔드로 code, state를 보내 최종 로그인 처리
            naverLogin(code, state)
                .then((response) => {
                    console.log("로그인 성공:", response);

                    // 응답 구조 예: response.results.token, response.results.user
                    const { token, user } = response.results;
                    localStorage.setItem("token", token);
                    localStorage.setItem("userInfo", JSON.stringify(user));

                    // 메인 페이지로 이동
                    navigate("/");
                })
                .catch((error) => {
                    console.error("네이버 로그인 실패:", error);
                    navigate("/");
                });
        } else {
            console.warn("Code 또는 state가 없습니다.");
            navigate("/");
        }
    }, [location, navigate]);

    return <div>네이버 로그인 중...</div>;
};

export default NaverSuccess;
