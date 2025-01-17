import { request, withoutTokenRequest, fastAPIrequest } from "./index";

// ✨✨api 요청 함수 만드는 예시!✨✨
export async function naverLogin(code, state) {
    try {
        const response = await withoutTokenRequest('GET',`/auth/callback?code=${code}&state=${state}&provider=naver`);
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
        const response = await withoutTokenRequest('GET',`/auth/callback?code=${code}&provider=kakao`);
        console.log("response: ",response)
        
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

export async function googleLogin(code, state) {
    try {
        const response = await withoutTokenRequest('GET', `/auth/callback?code=${code}&state=${state}&provider=google`);
        console.log("response: ", response.data);

        if (!response.data || !response.data.results) {
            throw new Error("Invalid API response");
        }

        const token = response.data.results.token;
        const userInfo = response.data.results.user;

        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        return true;
    } catch (error) {
        console.error('Google Login API error:', error);
        throw error;
    }
}
