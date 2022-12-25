import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

const instance = axios.create({
    baseURL: 'https://funny-post-server.vercel.app/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    if(localStorage.getItem('token') && config.headers){
        config.headers.Authorization =  'Bearer ' + JSON.parse(localStorage.getItem('token') || '{}');
    }
    return config;
}

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
    if(response && response.data) {
        return response.data;
    }else {
        return response
    }
}

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
}

const setupInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance => {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
}

export default setupInterceptorsTo(instance);
