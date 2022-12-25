import {Box, CircularProgress, Typography} from '@mui/material';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {useParams} from 'react-router-dom';
import {getUserById} from '../../api/user';
import {PostType, UserClientType} from '../../assets/interfaces';
import {ProfileBody, ProfileLoadingBox} from './styles';

import PostForm from '../../components/PostForm';
import {getUserPosts} from '../../api/post';
import PostList from '../../components/PostList';
import {useUser} from '../../hooks';
import EditUserInfoModal from '../../components/Modal/EditUserInfoModal';
import { useState } from 'react';
import ProfileHeader from '../../components/ProfileHeader';

const Profile = () => {
    const {userId} = useParams();
    const userClient: UserClientType = useUser();
    const [isOpenUpdateModal,setIsOpenUpdateModal] = useState<boolean>(false);

    const {
        isLoading: isLoadingUser,
        isError: isErrorUser,
        data: user,
    }: UseQueryResult<UserClientType, Error> = useQuery({
        queryKey: ['get-user-by-id', userId],
        queryFn: () => getUserById(userId as string),
    });

    const {
        isLoading: isLoadingPosts,
        isError: isErrorPosts,
        data: posts,
    }: UseQueryResult<PostType[], Error> = useQuery({
        queryKey: ['get-user-posts', userId],
        queryFn: () => getUserPosts(userId as string),
    });

    return (
        <div>
            {isLoadingUser ? (
                <ProfileLoadingBox>
                    <CircularProgress color='primary' />
                </ProfileLoadingBox>
            ) : isErrorUser ? (
                <Typography>Có lỗi sảy ra trong quá trình tải dữ liệu</Typography>
            ) : (
                <Box>
                    <ProfileHeader user={user} userClient={userClient} onOpenEditUserInfo={setIsOpenUpdateModal}/>
                    <ProfileBody>
                        {userClient._id === user._id && <PostForm />}
                        {isLoadingPosts ? (
                            <ProfileLoadingBox>
                                <CircularProgress />
                            </ProfileLoadingBox>
                        ) : isErrorPosts ? (
                            <Typography variant='subtitle2' sx={{textAlign: 'center'}}>
                                Có lỗi sảy ra trong quá trình tải dữ liệu
                            </Typography>
                        ) : (
                            <PostList data={posts} />
                        )}
                    </ProfileBody>
                    <EditUserInfoModal user={user} open={isOpenUpdateModal} onSetOpen={setIsOpenUpdateModal}/>
                </Box>
            )}
        </div>
    );
};

export default Profile;
