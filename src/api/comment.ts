import instance from './instance';
import {CommentType} from '../assets/interfaces';

export const createComment = (data: CommentType) => {
    const url = '/comment/create';
    return instance.post(url, data);
};

export const updateComment = (data: CommentType) => {
    const url = '/comment/update/' + data._id;
    return instance.put(url, {content:data.content});
};

export const deleteComment = (commentId: string) => {
    const url = '/comment/delete/' + commentId;
    return instance.delete(url);
};
