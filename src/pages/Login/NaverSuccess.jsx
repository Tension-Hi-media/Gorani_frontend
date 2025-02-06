import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { naverLogin } from '../../Apis/UserAPI';

const NaverSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        const state = params.get('state');

        console.log('Received code:', code);
        console.log('Received state:', state);

        if (!code || !state) {
            setError("네이버 인증 코드가 제공되지 않았습니다.");
            setLoading(false);
            return;
        }

        naverLogin(code, state)
            .then((response) => {
                console.log("로그인 성공:", response);
                
                // 응답 구조 예: response.results.token, response.results.user
                if (response.results) {
                    const { token, user } = response.results;
                    localStorage.setItem("token", token);
                    localStorage.setItem("userInfo", JSON.stringify(user));

                    navigate("/"); // 메인 페이지 이동
                } else {
                    throw new Error("잘못된 응답 구조입니다.");
                }
            })
            .catch((error) => {
                console.error("네이버 로그인 실패:", error);
                setError("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [location, navigate]);

    return (
        <div>
            {loading ? <p>네이버 로그인 중...</p> : error ? <p style={{ color: 'red' }}>{error}</p> : <p>로그인 성공! 메인 페이지로 이동 중...</p>}
        </div>
    );
};

export default NaverSuccess;
