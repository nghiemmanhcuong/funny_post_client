import {PostListStyled, WellcomCardStyled} from './styles';
import PostItem from '../PostItem';
import {PostType} from '../../assets/interfaces';
import {Avatar, Box, Typography} from '@mui/material';
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';

import wellComeImage from '../../assets/images/wellcom_image.jpg'
import adminImage from '../../assets/images/admin_image.jpg'

interface PostListProps {
    data: PostType[];
}

const PostList = ({data}: PostListProps) => {
    return (
        <PostListStyled>
            {data.length > 0 ? (
                data.map((post, index) => <PostItem key={index} post={post} />)
            ) : (
                <WellcomCardStyled>
                    <Box display='flex' alignItems='center' justifyContent='space-between'>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                marginBottom: '10px',
                            }}
                        >
                            <Avatar src={adminImage}/>
                            <Typography variant='body1' sx={{fontWeight: 'bold'}}>
                                Thông báo quản trị viên
                            </Typography>
                            <VerifiedRoundedIcon fontSize='small' color='primary'/>
                        </Box>
                    </Box>
                    <Typography variant='body1'>
                        Chào mừng bạn đến với Funny Post nơi chia sẻ trang thái hình ảnh cảm xúc của bạn!!!
                        <br />
                        Hãy đăng bài thêm bạn bè và đăng bài bài viết đầu tiên của bạn nhé!!!
                        <br />
                        Chúc bạn một ngày tốt lành và may mắn!!!
                    </Typography>
                    <Box className='post-image' sx={{background: 'rgba(0,0,0,0.1)'}}>
                        <img src={wellComeImage}/>
                    </Box>
                </WellcomCardStyled>
            )}
        </PostListStyled>
    );
};

export default PostList;
