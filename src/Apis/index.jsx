import axios from 'axios';

const DOMAIN = 'http://localhost:8080';
const DOMAIN2 = 'http://localhost:8000'

export const request = async (method, url, data) => {
    const token = localStorage.getItem('token'); // 로컬스토리지에서 토큰 가져오기

    try {
        const response = await axios({
            method,
            url: `${DOMAIN}${url}`,
            data,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
            },
        });

        console.log("API 요청 성공:", response); // 전체 응답 로그
        return response.data;
    } catch (error) {
        // 에러 상세 정보 출력
        console.error("API 요청 에러:", error.response?.status, error.response?.data || error.message);
        throw error;
    }
};

export const withoutTokenRequest = async (method, url, data) => {
    return await axios({
        method,
        url: `${DOMAIN}${url}`,
        data,
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => res)
    .catch(error => {
        console.error("비인증 API 요청 에러:", error);
        throw error; 
    });
};

export const fastAPIrequest = async (method, url, data) => {

    return await axios({
        method,
        url: `${DOMAIN}${url}`,
        data,
        headers: {
            'Content-Type': 'application/json',
        },
        
    })
    .then(res => res.data)
    .catch(error => {
        console.log(error);
        throw error; 
    });
};


// // Axios 기본 설정
// axios.defaults.baseURL = "http://localhost:8080";
// axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("jwtToken")}`;