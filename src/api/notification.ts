import {NotificationType} from '../assets/interfaces';
import instance from './instance';

export const createNotification = (data: NotificationType) => {
    const url = '/notification/create';
    return instance.post(url, data);
};

export const getNotifications = (userId: string) => {
    const url = '/notification/get-all/' + userId;
    return instance.get(url);
};

export const updateReadNotification = (notificationId: string) => {
    const url = '/notification/update-read/' + notificationId;
    return instance.put(url);
};

export const deleteNotification = (notificationId: string) => {
    const url = '/notification/delete/' + notificationId;
    return instance.delete(url);
};
