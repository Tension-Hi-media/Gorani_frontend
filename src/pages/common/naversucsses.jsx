import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const NaverSuccess = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    console.log('Received token:', token); // 토큰 로그 출력
    if (token) {
      localStorage.setItem('jwtToken', token);
      // 추가적인 로직: 상태 업데이트나 리다이렉트
    } else {
      console.log('No token found in URL parameters'); // 토큰이 없을 경우 로그
    }
  }, [location]);

  return <div>로그인 성공</div>;
};

export default NaverSuccess;
