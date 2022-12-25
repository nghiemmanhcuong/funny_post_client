import {Box, CircularProgress, Typography} from '@mui/material';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {getTimeLinePosts} from '../api/post';
import {PostType} from '../assets/interfaces';
import Helmet from '../components/Helmet';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

const Home = () => {
    const {isLoading, isError, data}: UseQueryResult<PostType[], Error> = useQuery({
        queryKey: ['posts'],
        queryFn: getTimeLinePosts,
    });

    return (
        <Helmet title="Trang chủ">
            <PostForm />
            {isLoading ? (
                <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                    <CircularProgress />
                </Box>
            ) : isError ? (
                <Typography variant='subtitle2' sx={{textAlign: 'center'}}>
                    Có lỗi sảy ra trong quá trình tải dữ liệu
                </Typography>
            ) : (
                <PostList data={data} />
            )}
        </Helmet>
    );
};

export default Home;
