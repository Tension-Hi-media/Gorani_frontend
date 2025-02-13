// src/Apis/request.js
import axios from 'axios';

// 필요에 따라 수정: EC2 도메인 및 포트
// const DOMAIN = 'http://3.38.113.109:8080'; // Spring Boot 서버
const DOMAIN = 'http://localhost:8080'; // Spring Boot 서버
// const DOMAIN2 = 'http://3.38.113.109:8000'; // FastAPI 서버 (사용 안 하면 지워도 됨)

// [1] 토큰이 필요한 요청
export const request = async (method, url, data) => {
    const token = localStorage.getItem('token'); // 로컬스토리지에서 토큰 가져오기

    try {
        const response = await axios({
            method,
            url: `/api/v1${url}`,
            data,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
            },
        });
        console.log("API 요청 성공:", response);
        return response.data; // data만 반환
    } catch (error) {
        console.error("API 요청 에러:", error.response?.status, error.response?.data || error.message);
        throw error;
    }
};
const BACKEND_URL = "http://localhost:8080/api/v1/translation";
// [2] 토큰이 필요 없는 요청(로그인, 회원가입 등)
export const withoutTokenRequest = async (method, url, data) => {
    try {
        const response = await axios({
            method,
            url: BACKEND_URL, // /api/v1 등 원하는 경로를 직접 붙여야 함
            data,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log("비인증 API 요청 성공:", response);
        return response;
    } catch (error) {
        console.error("비인증 API 요청 에러:", error);
        throw error;
    }
};

// // [3] FastAPI용 요청 (원하면 사용)
// export const fastAPIrequest = async (method, url, data) => {
//     try {
//         const response = await axios({
//             method,
//             url: `${DOMAIN2}${url}`,
//             data,
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });
//         return response.data;
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// };
