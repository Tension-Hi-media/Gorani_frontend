import { request, withoutTokenRequest, fastAPIrequest } from "./index";

// ✨✨api 요청 함수 만드는 예시!✨✨
export async function naverLogin(code, state) {
    try {
        const response = await withoutTokenRequest('GET',`/auth/naver/callback?code=${code}&state=${state}`);
        console.log("response: ",response.data)
        
        const token = response.data.results.token
        const userInfo = response.data.results.user

        // localStorage에 token과 userInfo 저장
        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        return true;
    } catch (error) {
        console.error('Login API error:', error);
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