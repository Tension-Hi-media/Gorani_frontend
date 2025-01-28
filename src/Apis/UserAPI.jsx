import { request, withoutTokenRequest, fastAPIrequest } from "./index";

// ✨✨api 요청 함수 만드는 예시!✨✨
// 네이버 로그인: code, state를 백엔드로 전송
export const naverLogin = async (code, state) => {
    // 백엔드 라우트 예: POST /api/v1/auth/naver
    // withoutTokenRequest를 사용할 것이므로, 여기서 /api/v1까지 직접 붙여야 함
    const url = '/api/v1/auth/naver';

    return await withoutTokenRequest('POST', url, { code, state })
        .then(res => {
            // withoutTokenRequest는 axios 전체 응답을 return하므로
            // 실제 데이터는 res.data에 있음
            return res.data;
        })
        .catch(error => {
            throw error;
        });
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
