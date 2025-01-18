import React from 'react';
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import Main from './pages/Main/main';
import Translation from './pages/Translation/translation';
import NaverLogin from './pages/Login/Naver';
import MyPage from './pages/User/myPage';
import NaverSuccess from './pages/Login/NaverSuccess';
import KakaoLogin from './pages/Login/KakaoLogin';
import KakaoSuccessPage from './pages/Login/KakaoSucess';
import GoogleSuccess from './pages/Login/GoogleSuccess'; // 구글 로그인 성공 컴포넌트 import

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/myPage' element={<MyPage />} />
          <Route path='/translation' element={<Translation />} />
          <Route path='/naver' element={<NaverLogin />} />
          <Route path="/naver-success" element={<NaverSuccess />} />
          <Route path='/kakao' element={<KakaoLogin/>}/>
          <Route path='/kakaoSuccess' element={<KakaoSuccessPage/>} />
          <Route path="/google/success" element={<GoogleSuccess />} /> {/* 구글 로그인 성공 라우트 추가 */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;