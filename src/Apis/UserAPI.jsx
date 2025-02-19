import { withoutTokenRequest } from "./index";

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
        const response = await withoutTokenRequest('POST', `/api/v1/auth/kakao`, { code });
        console.log("Kakao Login Response:", response);

        if (!response.data || !response.data.results) {
            throw new Error("Invalid API response: Missing results");
        }

        const token = response.data.results.token;
        const userInfo = response.data.results.user; // ✅ user 확인

        console.log("Received Token:", token);
        console.log("Received User Info:", userInfo);

        if (!token || !userInfo) {
            throw new Error("Invalid login response: Missing token or userInfo");
        }

        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        return true;
    } catch (error) {
        console.error('Kakao Login API error:', error);
        throw error;
    }
};


export async function googleLogin(code) {
    try {
        const response = await withoutTokenRequest('POST', `/api/v1/auth/google`, { code });
        console.log("Google Login Response:", response);

        if (!response.data || !response.data.results) {
            throw new Error("Invalid API response: Missing results");
        }

        const token = response.data.results.token;
        const userInfo = response.data.results.user;

        if (!token || !userInfo) {
            throw new Error("Invalid login response: Missing token or userInfo");
        }

        localStorage.setItem('token', token);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        return true;
    } catch (error) {
        console.error('Google Login API error:', error);
        throw error;
    }
};