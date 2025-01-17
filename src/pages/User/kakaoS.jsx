import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { kakaoLogin } from '../../Apis/UserAPI';

const KakaoSuccess = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');

        if (code) {
            console.log('Received code:', code);
            kakaoLogin(code)
                .then(response => {
                    console.log('Login successful:', response);
                    window.location.href = '/'; // 메인 페이지로 리다이렉트
                })
                .catch(error => {
                    console.error('Login failed:', error);
                    if (error.response && error.response.data) {
                        alert(`로그인 실패: ${error.response.data.message}`);
                    } else {
                        alert('로그인 중 문제가 발생했습니다. 다시 시도해주세요.');
                    }
                    window.location.href = '/login'; // 로그인 페이지로 리다이렉트
                })
                .finally(() => setLoading(false)); // 로딩 상태 변경
        } else {
            console.error('Authorization code not found');
            alert('인증 코드가 없습니다. 다시 로그인해주세요.');
            window.location.href = '/login';
        }
    }, [location, navigate]);

    if (loading) {
        return <div>로그인 처리 중...</div>;
    }

    return null; // 로딩이 끝나면 아무것도 렌더링하지 않음
};

export default KakaoSuccess;
