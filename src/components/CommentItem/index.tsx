import {CommentItemInfo, CommentItemWap} from './styles';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CancelIcon from '@mui/icons-material/Cancel';
import {
    Avatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    TextareaAutosize,
    Tooltip,
    Typography,
} from '@mui/material';

import {format} from 'timeago.js';

import notAvatar from '../../assets/images/not-avatar.webp';
import {CommentType, UserClientType} from '../../assets/interfaces';
import {useDeleteComment, useMenu, useUpdateComment, useUser} from '../../hooks';
import {useRef, useState} from 'react';
import {pink} from '@mui/material/colors';

interface CommentItemProps {
    comment: CommentType;
    postUserId: string;
}

const CommentItem = ({comment, postUserId}: CommentItemProps) => {
    const userClient: UserClientType = useUser();
    const contentRef = useRef<HTMLHeadingElement>(null);
    const inputContentRef = useRef<HTMLHeadingElement>(null);
    const [contentEditValue, setContentEditValue] = useState<string>(comment.content);
    const {open, anchorEl, handleOpen, handleClose} = useMenu();

    const handleEditBtnClick = () => {
        handleClose();
        if (contentRef.current) contentRef.current.style.display = 'none';
        if (inputContentRef.current) inputContentRef.current.style.display = 'flex';
    };

    const handleCancelEditBtnClick = () => {
        if (contentRef.current) contentRef.current.style.display = 'block';
        if (inputContentRef.current) inputContentRef.current.style.display = 'none';
    };

    const {mutate: updateCommentMutate} = useUpdateComment();
    const handleUpdateComment = () => {
        updateCommentMutate({content: contentEditValue, _id: comment._id});
        setTimeout(handleCancelEditBtnClick, 500);
    };

    const {mutate: deleteCommentMutate} = useDeleteComment();
    const handleDeleteComment = () => {
        handleClose();
        if (window.confirm('Bạn có muốn xoá bình luận này?')) {
            deleteCommentMutate(comment._id as string);
        }
    };

    return (
        <CommentItemWap>
            {comment.user?.profilePicture ? (
                <Avatar
                    sx={{width: '50px', height: '50px'}}
                    src={ comment.user?.profilePicture}
                />
            ) : (
                <Avatar sx={{width: '50px', height: '50px'}} src={notAvatar} />
            )}
            <CommentItemInfo>
                <Typography component='h6'>
                    {comment.user?.firstName + ' ' + comment.user?.lastName}{' '}
                    <Typography variant='caption' sx={{fontSize: '10px',color:'gray'}}>
                        {format(comment.createdAt as string, 'vi_VN')}
                    </Typography>
                </Typography>
                <Box alignItems='center' columnGap={1} sx={{display: 'none'}} ref={inputContentRef}>
                    <TextareaAutosize
                        value={contentEditValue}
                        onChange={(e) => setContentEditValue(e.target.value)}
                        style={{
                            fontFamily: "''Inter', sans-serif'",
                            padding: '4px',
                            outline: 'none',
                        }}
                    />
                    <Tooltip title='Sửa'>
                        <SendRoundedIcon
                            fontSize='small'
                            sx={{cursor: 'pointer'}}
                            onClick={handleUpdateComment}
                        />
                    </Tooltip>
                    <Tooltip title='Huỷ'>
                        <CancelIcon
                            fontSize='small'
                            color='secondary'
                            sx={{cursor: 'pointer'}}
                            onClick={handleCancelEditBtnClick}
                        />
                    </Tooltip>
                </Box>
                <Typography component='p' variant='caption' ref={contentRef}>
                    {comment.content}
                </Typography>
            </CommentItemInfo>
            {userClient._id == comment.user?._id || userClient._id == postUserId ? (
                <Tooltip title='Chức năng' placement='right'>
                    <IconButton onClick={handleOpen}>
                        <MoreHorizIcon sx={{cursor: 'pointer'}} />
                    </IconButton>
                </Tooltip>
            ) : null}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: -15,
                    horizontal: 35,
                }}
            >
                {userClient._id != postUserId || userClient._id == comment.user?._id ? (
                    <MenuItem onClick={handleEditBtnClick} sx={{fontSize: '13px'}}>
                        Sửa
                    </MenuItem>
                ) : null}
                <MenuItem onClick={handleDeleteComment} sx={{fontSize: '13px', color: pink[400]}}>
                    Xoá
                </MenuItem>
            </Menu>
        </CommentItemWap>
    );
};

export default CommentItem;
