import {
    Avatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Skeleton,
    Tooltip,
    Typography,
} from '@mui/material';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import InputEmoji from 'react-input-emoji';

import {PostItemAction, PostItemInfo, PostItemStyled} from './styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

import {getUserInPost} from '../../api/user';
import {CommentType, NotificationType, PostType, UserClientType} from '../../assets/interfaces';

import notAvatar from '../../assets/images/not-avatar.webp';

import {
    useCreateComment,
    useCreateNotification,
    useDeletePost,
    useLikePost,
    useMenu,
    useSoketIo,
    useUser,
} from '../../hooks';
import {useContext, useEffect, useRef, useState} from 'react';
import handlePostCreatedAt from '../../utils/handlePostCreatedAt';
import {pink} from '@mui/material/colors';
import {ModalContext} from '../../store/modal';
import {ModalActionType} from '../../store/type';
import {Link} from 'react-router-dom';
import {getPostComments} from '../../api/post';

interface PostItemProps {
    post: PostType;
}

interface ResultsgetPostCommentsTypes {
    comments: CommentType[];
    postUserId: string;
}

const PostItem = ({post}: PostItemProps) => {
    const socket = useRef<any>();
    const userClient: UserClientType = useUser();
    const {openModal} = useContext(ModalContext);
    const {open, anchorEl, handleOpen, handleClose} = useMenu();
    const [commentContent, setCommentContent] = useState<string>('');
    const [isLiked, setIsLiked] = useState<boolean>(
        Boolean(post.liked.includes(userClient._id as string)),
    );

    useEffect(() => {
        socket.current = useSoketIo();
    }, []);

    // Lấy thông tin tác giả của bài viết
    const {
        isLoading,
        isError,
        data: postUser,
    }: UseQueryResult<UserClientType, Error> = useQuery({
        queryKey: ['user', post.userId],
        queryFn: () => getUserInPost(post.userId),
        enabled: !!post.userId,
    });

    // Lấy tất cả comment của bài viết
    const {data: postComments}: UseQueryResult<ResultsgetPostCommentsTypes, Error> = useQuery({
        queryKey: ['get-post-comments', post._id],
        queryFn: () => getPostComments(post._id),
    });

    // Thay đổi trạng thái like bài viết mỗi khi user click vào nút like
    useEffect(() => {
        post.liked.includes(userClient._id as string) ? setIsLiked(true) : setIsLiked(false);
    }, [post]);

    // Thích bài viết
    const {mutate: likePostMutate} = useLikePost();
    const {mutate: createNotificationMutate} = useCreateNotification();

    const hanldeLikePost = () => {
        const notification: NotificationType = {
            senderId: userClient._id as string,
            receiverId: post.userId,
            content: `${userClient.firstName} ${userClient.lastName} đã thích bài viết của bạn`,
            link: `/post-detail/${post._id}`,
        };
        likePostMutate(post._id);
        if (!isLiked && userClient._id !== post.userId) {
            createNotificationMutate(notification);
            socket.current.emit('like-post', post.userId);
        }
        setIsLiked(!isLiked);
    };

    // Xoá bài viết
    const {mutate: deletePostMutate} = useDeletePost();
    const handleDeleteBtnClick = () => {
        handleClose();
        if (window.confirm('Bạn thật sự muốn xoá bài viết này?')) {
            deletePostMutate(post._id);
        } else {
            return false;
        }
    };

    // Bình luận bài viết
    const {mutate: createCommentMutate} = useCreateComment();
    const handleCreateComment = () => {
        const newComment = {
            postId: post._id,
            userId: userClient._id,
            content: commentContent,
        };
        const notification: NotificationType = {
            senderId: userClient._id as string,
            receiverId: post.userId,
            content: `${userClient.firstName} ${userClient.lastName} đã bình luận về bài viết của bạn`,
            link: `/post-detail/${post._id}`,
        };

        createCommentMutate(newComment);
        setCommentContent('');

        if (userClient._id !== post.userId) {
            createNotificationMutate(notification);
            socket.current.emit('comment-post', post.userId);
        }
    };

    // Thêm vào localStorage id của bài viết cần sửa đồng thời mở modal sửa bài viết
    const handleEditBtnClick = () => {
        handleClose();
        localStorage.setItem('post-id', JSON.stringify(post._id));
        openModal(ModalActionType.OPEN_EDIT_POST_MODAL);
    };

    const handleCommentClick = () => {
        localStorage.setItem('post-id', JSON.stringify(post._id));
        openModal(ModalActionType.OPEN_COMMENT_MODAL);
    };

    return isLoading || isError ? (
        <Box>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1, marginBottom: '10px'}}>
                <Skeleton variant='circular' width={40} height={40} />
                <Skeleton variant='rounded' width={410} height={40} />
            </Box>
            <Skeleton variant='rounded' width={750} height={20} />
            <Skeleton variant='rectangular' width={750} height={430} />
        </Box>
    ) : (
        <PostItemStyled>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
                <Box sx={{display: 'flex', alignItems: 'center', gap: 1, marginBottom: '10px'}}>
                    {postUser.profilePicture ? (
                        <Link to={`/profile/${postUser._id}`}>
                            <Avatar src={ postUser.profilePicture} />
                        </Link>
                    ) : (
                        <Avatar src={notAvatar} />
                    )}
                    <Link to={`/profile/${postUser._id}`}>
                        <Typography variant='subtitle2'>
                            {postUser!.firstName + ' ' + postUser!.lastName}
                        </Typography>
                        <Typography variant='caption' sx={{color: 'gray'}}>
                            {handlePostCreatedAt(post.createdAt)}
                        </Typography>
                    </Link>
                </Box>
                {userClient._id === post.userId && (
                    <Box>
                        <IconButton onClick={(e) => handleOpen(e)}>
                            <MoreHorizIcon sx={{cursor: 'pointer'}} />
                        </IconButton>
                        <Menu
                            id='basic-menu'
                            anchorOrigin={{
                                vertical: 20,
                                horizontal: -110,
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleEditBtnClick}>Sửa bài viết</MenuItem>
                            <MenuItem onClick={handleDeleteBtnClick} sx={{color: pink[400]}}>
                                Xoá
                            </MenuItem>
                        </Menu>
                    </Box>
                )}
            </Box>
            <Typography variant='body1'>{post.description}</Typography>
            {post.image && (
                <Box className='post-image' sx={{background: 'rgba(0,0,0,0.1)'}}>
                    <img src={ post.image} />
                </Box>
            )}
            <PostItemInfo>
                <Typography variant='body2'>{post.liked.length} lượt yêu thích</Typography>
                <Tooltip title='Nhấn để xem' placement='left' sx={{cursor: 'pointer'}}>
                    <Typography variant='body2' onClick={handleCommentClick}>
                        {postComments && postComments.comments?.length} bình luận
                    </Typography>
                </Tooltip>
            </PostItemInfo>
            <PostItemAction>
                <FavoriteIcon
                    sx={{cursor: 'pointer'}}
                    color={isLiked ? 'secondary' : undefined}
                    onClick={hanldeLikePost}
                />
                <InputEmoji
                    placeholder='Nội dung bình luận...  '
                    value={commentContent as string}
                    onChange={setCommentContent}
                />
                <Tooltip title='Gửi bình luận' placement='right'>
                    <SendRoundedIcon sx={{cursor: 'pointer'}} onClick={handleCreateComment} />
                </Tooltip>
            </PostItemAction>
        </PostItemStyled>
    );
};

export default PostItem;
