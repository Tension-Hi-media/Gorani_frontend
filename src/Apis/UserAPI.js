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

export async function kakaoLogin(code) {
    try {
        const response = await withoutTokenRequest('GET',`/auth/kakao/callback?code=${code}`);
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