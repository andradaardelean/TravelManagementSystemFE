import axios from 'axios';
import {message} from "antd";

const instance = axios.create({
    baseURL: 'https://bustravel-management-system.onrender.com/api',
    //baseURL: 'http://localhost:8083/api',
    timeout: 10000,
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("auth0token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        config.headers['Content-Type'] = 'application/json';
        config.headers['Access-Control-Allow-Origin'] = '*';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
       if(error?.response?.data !== "Search failed! Search failed!No routes found!") {
           if (!window.location.href.includes("routes") && window.location.pathname !== "/") {
               message.error(error?.response?.data?.message ?? error?.response?.data ?? error.toString());
           }
       }
        return Promise.reject(error);
    }
);

export default instance;
