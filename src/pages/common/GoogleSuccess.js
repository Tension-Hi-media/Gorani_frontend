import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { googleLogin } from '../../Apis/UserAPI2';

const GoogleSuccess = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const state = params.get('state');
    console.log('Received code:', code); // 구글 로그인 코드 출력
    console.log('Received state:', state); // 구글 로그인 state 출력
    if (code) {
      googleLogin(code, state); // 구글 로그인 처리 함수 호출
      window.location.href = 'http://localhost:3000'; // 로그인 후 홈 페이지로 리디렉션
    } 
  }, [location]);

  return <div>로그인 성공</div>;
};

export default GoogleSuccess;
