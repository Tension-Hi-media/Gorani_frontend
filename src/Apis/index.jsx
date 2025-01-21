import axios from 'axios';

const DOMAIN = 'http://localhost:8080';
const DOMAIN2 = 'http://localhost:8000'

const handleApiError = (error) => {
    if (error.response) {
      console.error("API 응답 에러:", error.response.data);
    } else if (error.request) {
      console.error("API 요청 미응답:", error.request);
    } else {
      console.error("API 요청 설정 에러:", error.message);
    }
    throw error;
  };

export const request = async (method, url, data) => {

    return await axios({
        method,
        url: `${DOMAIN}${url}`,
        data,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
    })
    .then(res => res.data)
    .catch(error => {
        console.error("API 요청 에러:", error);
        throw error;
    });
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
        url: `${DOMAIN2}${url}`,
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