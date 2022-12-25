import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {useContext, useEffect} from 'react';
import {getPostComments} from '../../api/post';
import {CommentType} from '../../assets/interfaces';
import {ModalContext} from '../../store/modal';
import {ModalActionType} from '../../store/type';
import CommentItem from '../CommentItem';

interface ResultsgetPostCommentsTypes {
    comments: CommentType[];
    postUserId: string;
}

const PostCommentModal = () => {
    const {modal, closeModal} = useContext(ModalContext);
    const postId: string = JSON.parse(localStorage.getItem('post-id') || 'null');

    const {isLoading, isError, data, refetch}: UseQueryResult<ResultsgetPostCommentsTypes, Error> = useQuery({
        queryKey: ['get-post-comments', postId],
        queryFn: () => getPostComments(postId),
        enabled: false,
    });

    useEffect(() => {
        if (postId) {
            refetch();
        }
    }, [postId]);

    const handleCloseModal = () => {
        closeModal(ModalActionType.CLOSE_COMMENT_MODAL);
        localStorage.removeItem('post-id');
    };

    return (
        <Dialog open={modal.isOpenCommentModal} onClose={handleCloseModal} maxWidth='sm' fullWidth>
            <DialogTitle textAlign='center'>Bình luận bài viết</DialogTitle>
            <DialogContent>
                {isLoading ? (
                    <Box display='flex' alignItems='center' justifyContent='center'>
                        <CircularProgress />
                    </Box>
                ) : isError ? (
                    <Typography variant='subtitle1' textAlign='center'>
                        Có lỗi sảy ra trong quá trình tải dữ liệu
                    </Typography>
                ) : data.comments.length > 0 ? (
                    data.comments.map((comment) => <CommentItem key={comment._id} postUserId={data.postUserId} comment={comment} />)
                ) : (
                    <Typography variant='subtitle1' textAlign='center'>Bài viết không có bình luận nào!</Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='secondary' onClick={handleCloseModal}>
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PostCommentModal;
