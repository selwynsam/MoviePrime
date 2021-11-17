import axios from 'axios';

let axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

axiosInstance.interceptors.request.use(config =>{
    config.params = config.params || {};
    config.headers.Authorization = `Bearer ${process.env.REACT_APP_API_AUTH_TOKEN}`;
    return config;
});

export default axiosInstance;