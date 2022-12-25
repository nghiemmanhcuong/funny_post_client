import {Box, CircularProgress, Typography} from '@mui/material';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {useParams} from 'react-router-dom';
import {getPostById, getPostComments} from '../../api/post';
import {CommentType, PostType} from '../../assets/interfaces';
import CommentItem from '../../components/CommentItem';
import PostItem from '../../components/PostItem';
import {PostDetailComment} from './styles';

interface ResultsgetPostCommentsTypes {
    comments: CommentType[];
    postUserId: string;
}

const PostDetail = () => {
    const params = useParams();
    const {isLoading, isError, data}: UseQueryResult<PostType, Error> = useQuery({
        queryKey: ['get-post-by-id', params.postId],
        queryFn: () => getPostById(params.postId as string),
    });

    const {
        isLoading: isLoadingComment,
        isError: isErrorComment,
        data: postComments,
        refetch,
    }: UseQueryResult<ResultsgetPostCommentsTypes, Error> = useQuery({
        queryKey: ['get-post-comments', params.postId],
        queryFn: () => getPostComments(params.postId as string),
        enabled: false,
    });

    return isLoading ? (
        <Box display='flex' alignItems='center' justifyContent='center' sx={{marginTop: '25px'}}>
            <CircularProgress />
        </Box>
    ) : isError ? (
        <Typography>Có lỗi sảy ra trong quá trình tải dữ liệu</Typography>
    ) : (
        <>
            <PostItem post={data} />
            <PostDetailComment>
                {isLoadingComment ? (
                    <></>
                ) : isErrorComment ? (
                    <></>
                ) : (
                    postComments.comments.map((comment) => (
                        <CommentItem
                            key={comment._id}
                            postUserId={postComments.postUserId}
                            comment={comment}
                        />
                    ))
                )}
            </PostDetailComment>
        </>
    );
};

export default PostDetail;
