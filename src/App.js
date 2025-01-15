import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/main';
import Translation from './pages/Translation/translation';
import NaverLogin from './pages/User/naver';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/translation' element={<Translation />} />
          <Route path='/naver' element={<NaverLogin />} />
          <Route path="/naver/callback" element={<NaverLogin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;