import axios from 'axios';
import {message} from "antd";

const instance = axios.create({
    baseURL: 'http://localhost:8083/api',
    timeout: 10000,
});

instance.interceptors.request.use(
    (config) => {
        //console.log("API Req: ", config.baseURL, config.url, config.method, config.headers, config.data, config.params);
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
        // console.log("API Res: ", response.status, response.statusText, response.headers, response.data)

        return response;
    },
    (error) => {
        message.error(error?.response?.data?.message ?? error?.response?.data ?? error.toString());
        console.log(error)
        if (error?.response?.status === 401) {
            // localStorage.clear();
            // window.location.href = "/";
        }
        return Promise.reject(error);
    }
);

export default instance;
