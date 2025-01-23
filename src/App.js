// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/main';
import Translation from './pages/Translation/Translation';
import NaverLogin from './pages/Login/Naver';
import MyPage from './pages/User/MyPage';
import NaverSuccess from './pages/Login/NaverSuccess';
import KakaoLogin from './pages/Login/KakaoLogin';
import KakaoSuccessPage from './pages/Login/KakaoSucess';
import KakaoCallback from './pages/Login/KakooCallBack';
import GoogleSuccess from './pages/Login/GoogleSuccess'; // 구글 로그인 성공 컴포넌트 import
// import '../src/assets/css/all.css'; // 전역 스타일 (테마 관련 CSS 포함)

function App() {
  // 테마 상태 관리 (기본값: 'light')
  // const [theme, setTheme] = useState('light');

  // // 로컬 스토리지에서 테마 가져오기
  // useEffect(() => {
  //   const storedTheme = localStorage.getItem('theme');
  //   if (storedTheme) {
  //     setTheme(storedTheme);
  //     document.documentElement.setAttribute('data-theme', storedTheme);
  //   }
  // }, []);

  // // 테마 변경 함수
  // const toggleTheme = () => {
  //   const newTheme = theme === 'light' ? 'dark' : 'light';
  //   setTheme(newTheme);
  //   document.documentElement.setAttribute('data-theme', newTheme);
  //   localStorage.setItem('theme', newTheme); // 테마 선택 저장
  // };

  return (
    <BrowserRouter>
      {/* 헤더에 테마 토글 버튼 추가
      <header style={headerStyle}>
        <h1>Gorani</h1>
        <button onClick={toggleTheme} style={buttonStyle}>
          {theme === 'light' ? '🌙 다크 모드' : '☀️ 라이트 모드'}
        </button>
      </header> */}

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/translation" element={<Translation />} />
        <Route path="/naver" element={<NaverLogin />} />
        <Route path="/naver-success" element={<NaverSuccess />} />
        <Route path="/kakao" element={<KakaoLogin />} />
        <Route path="/kakaoSuccess" element={<KakaoSuccessPage />} />
        <Route path="/kakaoCallback" element={<KakaoCallback />} />
        <Route path="/google/success" element={<GoogleSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

// 간단한 인라인 스타일 (선택 사항)
// const headerStyle = {
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   padding: '10px 20px',
//   backgroundColor: 'var(--modal-bg-color)', // CSS 변수 사용
//   color: 'var(--modal-text-color)',
//   boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
// };

// const buttonStyle = {
//   padding: '8px 16px',
//   border: 'none',
//   borderRadius: '4px',
//   cursor: 'pointer',
//   backgroundColor: 'var(--button-save-bg)', // CSS 변수 사용
//   color: 'white',
//   transition: 'background-color 0.3s ease',
// };

export default App;
