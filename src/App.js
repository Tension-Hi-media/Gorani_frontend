import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/main';
import Translation from './pages/Translation/translation';
import NaverLogin from './pages/Common/naver';
import NaverSuccess from './pages/Common/naversucsses';
import MyPage  from './pages/User/myPage';
import NaverCallback from './pages/Common/NaverCallback';


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
          <Route path="/naver-callback" element={<NaverCallback />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;