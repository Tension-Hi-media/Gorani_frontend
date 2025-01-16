import { request, withoutTokenRequest, fastAPIrequest } from "./index";

// ✨✨api 요청 함수 만드는 예시!✨✨
export async function naverLogin(code, state) {
    try {
        const response = await withoutTokenRequest('GET',`/auth/naver/callback?code=${code}&state=${state}`);
        console.log("response: ",response.data)

        return true;
    } catch (error) {
        console.error('Login API error:', error);
        throw error;
    }
};