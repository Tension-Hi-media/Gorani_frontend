import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { kakaoLogin } from '../../Apis/UserAPI';

const KakaoSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        console.log('Received code:', code); // 토큰 로그 출력
        if (code) {
            kakaoLogin(code)
                .then(() => {
                    navigate('/'); // 메인 화면으로 이동
                })
                .catch((error) => {
                    console.error('로그인 실패:', error);
                });
        }
    }, [location, navigate]);

    return <div>로그인 성공</div>;
};

export default KakaoSuccess;
