import {InputRegisterType,InputLoginType} from '../assets/interfaces';
import instance from './instance';

export const login = (data:InputLoginType) => {
    const url = '/auth/login';
    return instance.post(url, data);
};

export const register = (data:InputRegisterType) => {
    const url = '/auth/register';
    return instance.post(url, data);
};
