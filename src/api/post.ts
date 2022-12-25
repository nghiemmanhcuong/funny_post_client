import {NewPostType} from '../assets/interfaces';
import instance from './instance';

interface updatePostType {
    data: NewPostType;
    postId: string;
}

export const createPost = (data: NewPostType) => {
    const url = '/post/create';
    return instance.post(url, data);
};

export const updatePost = ({postId, ...data}: updatePostType) => {
    const url = '/post/update/' + postId;
    return instance.put(url, data);
};

export const deletePost = (postId: string) => {
    const url = '/post/delete/' + postId;
    return instance.delete(url);
};

export const getTimeLinePosts = () => {
    const url = '/post/timeline-post';
    return instance.get(url);
};

export const likePost = (postId: string) => {
    const url = '/post/like-post/' + postId;
    return instance.put(url);
};

export const getPostById = (postId: string) => {
    const url = '/post/get-post/' + postId;
    return instance.get(url);
};

export const getUserPosts = (userId: string) => {
    const url = '/post/get-posts/' + userId;
    return instance.get(url);
};  

export const getPostComments = (postId: string) => {
    const url = '/post/get-comments/' + postId;
    return instance.get(url);
};
