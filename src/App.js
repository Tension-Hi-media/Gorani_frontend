import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/main';
import Translation from './pages/Translation/translation';
import NaverLogin from './pages/User/naver';
import KakaoLogin from './pages/User/kakao';
import KakaoSuccessPage from './pages/User/kakaoS';
import NaverLogin from './pages/Common/naver';
import MyPage from './pages/User/myPage';
import NaverSuccess from './pages/Common/naverSuccess';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/myPage' element={<MyPage />} />
          <Route path='/translation' element={<Translation />} />
          <Route path='/naver' element={<NaverLogin />} />
          <Route path="/naver-success" element={<NaverSuccess />} />
          <Route path="/naver/callback" element={<NaverLogin />} />
          <Route path='/kakao' element={<KakaoLogin/>}/>
          <Route path='/kakaoSuccess' element={<KakaoSuccessPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;