import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { kakaoLogin, naverLogin } from '../../Apis/UserAPI';

const KakaoSuccessPage = () => {
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        console.log('Received code:', code); // 토큰 로그 출력
        if (code) {
            kakaoLogin(code);
            // window.location.href = 'http://localhost:3000'
        }
    }, [location]);

    return <div>로그인 성공</div>;
};

export default KakaoSuccessPage;
