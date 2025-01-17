import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { googleLogin } from '../../Apis/UserAPI';

const GoogleSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');

    if (code) {
      googleLogin(code)
        .then(() => {
          navigate('/'); // 메인 화면으로 이동
        })
        .catch(() => {
          setError('로그인 중 문제가 발생했습니다.');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setError('Google 인증 코드가 제공되지 않았습니다.');
      setLoading(false);
    }
  }, [location, navigate]);

  if (loading) {
    return <div>로그인 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <div>로그인 성공</div>;
};

export default GoogleSuccess;
