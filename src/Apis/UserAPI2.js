import axios from 'axios'; 

// 기존에 선언된 withoutTokenRequest 함수
export const withoutTokenRequest = async (method, url, data = null) => {
  try {
    const response = await axios({
      method: method,
      url: `http://localhost:8080${url}`, // API 서버 주소
      data: data,
      headers: { 'Content-Type': 'application/json' }
    });
    return response; // 응답 반환
  } catch (error) {
    console.error('API 요청 실패:', error);
    throw error;
  }
};

// googleLogin 함수는 그대로 사용
export async function googleLogin(code, state) {
    try {
        const response = await withoutTokenRequest('GET', `/auth/google/callback?code=${code}&state=${state}`);
        console.log("response: ", response.data);
        
        const token = response.data.results.token;
        const userInfo = response.data.results.user;

        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        return true;
    } catch (error) {
        console.error('Google Login API error:', error);
        throw error;
    }
};
