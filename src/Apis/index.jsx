import axios from 'axios';

const DOMAIN = 'http://localhost:8080';
const DOMAIN2 = 'http://localhost:8000'

export const request = async (method, url, data) => {

    return await axios({
        method,
        url: `${DOMAIN}${url}`,
        data,
        headers: {
            'Content-Type': 'application/json', // JSON으로 요청한다는 것을 명시
            'Authorization': localStorage.getItem('token'), // 토큰 request header에 담아주기
        },
        
    })
    .then(res => res.data)
    .catch(error => {
        console.log(error);
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
        console.log(error);
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