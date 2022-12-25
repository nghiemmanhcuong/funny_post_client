import { UserInfoType } from '../assets/interfaces';
import instance from './instance';

export const getUserInPost = (userId: string) => {
    const url = '/user/get-user-in-post/' + userId;
    return instance.get(url);
};

export const getUser = (page: number) => {
    const url = '/user/get-user?page=' + page;
    return instance.get(url);
};

export const getUserById = (userId: string) => {
    const url = '/user/get-by-id/' + userId;
    return instance.get(url);
}

export const getUserImages = () => {
    const url = '/user/get-images';
    return instance.get(url);
}

export const searchFriends = (username: string) => {
    const url = '/user/search-friends/' + username;
    return instance.get(url);
}

export const follow = (followUserId: string) => {
    const url = '/user/follow/' + followUserId;
    return instance.put(url);
};

export const unfollow = (unfollowUserId: string) => {
    const url = '/user/unfollow/' + unfollowUserId;
    return instance.put(url);
};

export const getFriends = () => {
    const url = '/user/get-friends';
    return instance.get(url);
}

export const updateUserInfo = (data:UserInfoType) => {
    const url = '/user/update-info';
    return instance.put(url,data);
}
