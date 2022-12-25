import axios from 'axios';
import {ChangeEvent, Dispatch} from 'react';
import {UserClientType} from '../../assets/interfaces';
import {useUpdateUserInfo} from '../../hooks';

import {Box, Grid, IconButton, Stack, Tooltip, Typography} from '@mui/material';
import {
    FollowBox,
    ProfileAvatarWap,
    ProfileCoverPictureWap,
    ProfileHeaderWap,
    ProfileInfoHeader,
} from './styles';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded';
import updateUserAvatarInLocalStorage from '../../utils/updateUserAvatarInLocalStorage';

import notCoverImg from '../../assets/images/cover_image.jpeg';
import notAvatar from '../../assets/images/not-avatar.webp';
import uploadImage from '../../utils/uploadImage';

interface ProfileHeaderProps {
    user: UserClientType;
    userClient: UserClientType;
    onOpenEditUserInfo: Dispatch<React.SetStateAction<boolean>>;
}

const ProfileHeader = ({user, userClient, onOpenEditUserInfo}: ProfileHeaderProps) => {
    const {mutate: updateUserInfoMutate} = useUpdateUserInfo();

    const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>, type: string) => {
        if (e.target.files && e.target.files[0]) {
            if (window.confirm('Bạn muốn chọn ảnh này?')) {
                const filename = await uploadImage(e.target.files[0]);

                switch (type) {
                    case 'avatar':
                        updateUserInfoMutate({profilePicture: filename});
                        updateUserAvatarInLocalStorage(filename);
                        break;
                    case 'cover-picture':
                        updateUserInfoMutate({coverPicture: filename});
                        break;
                    default:
                        return;
                }
            } else {
                e.target.value = '';
            }
        }
    };

    return (
        <ProfileHeaderWap>
            {user.coverPicture ? (
                <ProfileCoverPictureWap>
                    <img src={ user.coverPicture} className='cover_img' />
                    {userClient._id === user._id && (
                        <Box className='upload-cover-picture' component='label'>
                            <input
                                hidden
                                accept='image/*'
                                type='file'
                                onChange={(e) => handleChangeImage(e, 'cover-picture')}
                            />
                            <PhotoCameraRoundedIcon color='action' fontSize='medium' />
                        </Box>
                    )}
                </ProfileCoverPictureWap>
            ) : (
                <ProfileCoverPictureWap>
                    <img src={notCoverImg} className='cover_img' />
                    {userClient._id === user._id && (
                        <Box
                            title='Sửa ảnh đại diện'
                            className='upload-cover-picture'
                            component='label'
                        >
                            <input
                                hidden
                                accept='image/*'
                                type='file'
                                onChange={(e) => handleChangeImage(e, 'cover-picture')}
                            />
                            <PhotoCameraRoundedIcon color='action' fontSize='medium' />
                        </Box>
                    )}
                </ProfileCoverPictureWap>
            )}
            {user.profilePicture ? (
                <ProfileAvatarWap>
                    <img src={ user.profilePicture} className='avatar' />
                    {userClient._id === user._id && (
                        <Box className='upload-avatar' component='label'>
                            <input
                                hidden
                                accept='image/*'
                                type='file'
                                onChange={(e) => handleChangeImage(e, 'avatar')}
                            />
                            <PhotoCameraRoundedIcon color='action' fontSize='small' />
                        </Box>
                    )}
                </ProfileAvatarWap>
            ) : (
                <ProfileAvatarWap>
                    <img src={notAvatar} className='avatar' />
                    {userClient._id === user._id && (
                        <Box className='upload-avatar' component='label'>
                            <input
                                hidden
                                accept='image/*'
                                type='file'
                                onChange={(e) => handleChangeImage(e, 'avatar')}
                            />
                            <PhotoCameraRoundedIcon color='action' fontSize='small' />
                        </Box>
                    )}
                </ProfileAvatarWap>
            )}
            <ProfileInfoHeader>
                <Box className='info-name'>
                    <Typography variant='subtitle1' component='h6'>
                        {user.firstName + ' ' + user.lastName}
                    </Typography>
                    {userClient._id === user._id && (
                        <Tooltip title='Sửa thông tin cá nhân' placement='right'>
                            <IconButton onClick={() => onOpenEditUserInfo(true)}>
                                <EditRoundedIcon fontSize='small' />
                            </IconButton>
                        </Tooltip>
                    )}
                </Box>
                <FollowBox>
                    <Typography variant='body2' sx={{marginRight: '20px'}}>
                        <span>Theo dõi: </span>
                        {user.followers?.length}
                    </Typography>
                    <Typography variant='body2'>
                        <span>Đang theo dõi: </span>
                        {user.followings?.length}
                    </Typography>
                </FollowBox>
            </ProfileInfoHeader>
            <Grid container sx={{padding: '20px', minWidth: '800px'}}>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <Typography variant='body2'>
                            <span style={{fontWeight: 600}}>Đang sống tại: </span>
                            {user.livesIn ? user.livesIn : 'Không có'}
                        </Typography>
                        <Typography variant='body2'>
                            <span style={{fontWeight: 600}}>Địa chỉ: </span>
                            {user.address ? user.address : 'Không có'}
                        </Typography>
                        <Typography variant='body2'>
                            <span style={{fontWeight: 600}}>Nơi làm việc: </span>
                            {user.worksAt ? user.worksAt : 'Không có'}
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <Stack spacing={1}>
                        <Typography variant='body2'>
                            <span style={{fontWeight: 600}}>Tình trạng quan hệ: </span>
                            {user.relationships ? user.relationships : 'Không có'}
                        </Typography>
                        <Typography variant='body2'>
                            <span style={{fontWeight: 600}}>Công việc hiện tại: </span>
                            {user.job ? user.job : 'Không có'}
                        </Typography>
                        <Typography variant='body2'>
                            <span style={{fontWeight: 600}}>Giới thiệu: </span>
                            {user.about ? user.about : 'Không có'}
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
        </ProfileHeaderWap>
    );
};

export default ProfileHeader;
