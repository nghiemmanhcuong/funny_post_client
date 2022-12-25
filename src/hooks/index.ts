import React from 'react';
import io from 'socket.io-client';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {createComment, deleteComment, updateComment} from '../api/comment';
import { createNotification, deleteNotification, updateReadNotification } from '../api/notification';
import {createPost, deletePost, likePost, updatePost} from '../api/post';
import {follow, unfollow, updateUserInfo} from '../api/user';

export const useUser = () => {
    return JSON.parse(localStorage.getItem('user') || '{}');
};

export const useSoketIo = () => {
    return io('https://funny-post-server.vercel.app/', {
        transports: ['websocket', 'polling', 'flashsocket'],
    });
}

export const useMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return {open, anchorEl, handleOpen, handleClose};
};

export const useCreatePost = () => {
    const queryClient = useQueryClient();
    return useMutation(createPost, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['posts']});
            queryClient.invalidateQueries({queryKey: ['get-user-posts']});
        },
    });
};

export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    return useMutation(updatePost, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['posts']});
            queryClient.invalidateQueries({queryKey: ['get-user-posts']});
        },
    });
};

export const useDeletePost = () => {
    const queryClient = useQueryClient();
    return useMutation(deletePost, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['posts']});
            queryClient.invalidateQueries({queryKey: ['get-user-posts']});
        },
    });
};

export const useLikePost = () => {
    const queryClient = useQueryClient();
    return useMutation(likePost, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['posts']});
            queryClient.invalidateQueries({queryKey: ['get-user-posts']});
        },
    });
};

export const useFollow = () => {
    const queryClient = useQueryClient();
    return useMutation(follow, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['posts']});
            queryClient.invalidateQueries({queryKey: ['get-friends']});
            queryClient.invalidateQueries({queryKey: ['search-friends']});
            queryClient.invalidateQueries({queryKey: ['get-current-user-friends']});
        },
    });
};

export const useUnFollow = () => {
    const queryClient = useQueryClient();
    return useMutation(unfollow, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['posts']});
            queryClient.invalidateQueries({queryKey: ['get-friends']});
            queryClient.invalidateQueries({queryKey: ['search-friends']});
            queryClient.invalidateQueries({queryKey: ['get-current-user-friends']});
        },
    });
};

export const useUpdateUserInfo = () => {
    const queryClient = useQueryClient();
    return useMutation(updateUserInfo, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['get-user-by-id']});
        },
    });
};

export const useCreateComment = () => {
    const queryClient = useQueryClient();
    return useMutation(createComment, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['posts']});
            queryClient.invalidateQueries({queryKey: ['get-user-posts']});
            queryClient.invalidateQueries({queryKey: ['get-post-comments']});
        },
    });
};

export const useUpdateComment = () => {
    const queryClient = useQueryClient();
    return useMutation(updateComment, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['get-post-comments']});
        },
    });
}

export const useDeleteComment = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteComment, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['get-post-comments']});
        },
    });
}

export const useCreateNotification = () => {
    return useMutation(createNotification)
}

export const useUpdateReadNotification = () => {
    const queryClient = useQueryClient();
    return useMutation(updateReadNotification, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['get-notifications']});
        },
    });
}

export const useDeleteNotification = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteNotification, {
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['get-notifications']});
        },
    });
}
