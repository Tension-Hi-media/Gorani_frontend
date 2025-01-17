import React from 'react';
import { BrowserRouter, Routes, Route,} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Main from './pages/Main/main';
import Translation from './pages/Translation/translation';
import NaverLogin from './pages/Common/naver';
import MyPage from './pages/User/myPage';
import NaverSuccess from './pages/Common/naverSuccess';
import KakaoLogin from './pages/User/kakao';
import KakaoSuccessPage from './pages/User/kakaoS';
import KakaoCallback from './pages/User/kakoCallBack';
import GoogleSuccess from './pages/Common/GoogleSuccess'; // 구글 로그인 성공 컴포넌트 import
import GoogleCallback from './pages/Common/GoogleCallback'; // 구글 로그인 콜백 컴포넌트 import

const clientId = "800620068616-3ghg401p0pmbv8h1hj84qlj45qmkpgli.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/myPage' element={<MyPage />} />
          <Route path='/translation' element={<Translation />} />
          <Route path='/naver' element={<NaverLogin />} />
          <Route path="/naver-success" element={<NaverSuccess />} />
          <Route path='/kakao' element={<KakaoLogin/>}/>
          <Route path='/kakaoSuccess' element={<KakaoSuccessPage/>} />
          <Route path='/kakaoCallback' element={<KakaoCallback/>} />
          <Route path="/google/success" element={<GoogleSuccess />} /> {/* 구글 로그인 성공 라우트 추가 */}
          <Route path="/oauth2/callback" element={<GoogleCallback />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
