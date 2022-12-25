import axios from 'axios';
import {ChangeEvent, FormEvent, useRef, useState} from 'react';
import {Avatar, Box, Button, IconButton} from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import PhotoCameraRoundedIcon from '@mui/icons-material/PhotoCameraRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import {PostFormStyled, PreviewImage} from './styles';
import {NewPostType, UserClientType} from '../../assets/interfaces';
import {useCreatePost, useUser} from '../../hooks';
import notAvatar from '../../assets/images/not-avatar.webp'
import uploadImage from '../../utils/uploadImage';

const PostForm = () => {
    const userClient: UserClientType = useUser();
    const {mutate: createPostMutate} = useCreatePost()
    
    const [image, setImage] = useState<File>();
    const [description, setDescription] = useState<string>('');

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            e.target.value = '';
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newPost: NewPostType = {description, image: ''};

        if(image) {
            const postImage = await uploadImage(image);
            newPost.image = postImage;
        }
        createPostMutate(newPost);
        setImage(undefined);
        setDescription('');
    };

    return (
        <PostFormStyled onSubmit={handleSubmit}>
            <Box>
                {userClient.profilePicture ? (
                    <Avatar src={ userClient.profilePicture} className='user_avatar' />
                ) : (
                    <Avatar src={notAvatar}/>
                )}
                <input
                    required
                    placeholder={`${userClient.lastName},Bạn đang nghĩ gì?`}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <IconButton color='primary' aria-label='upload picture' component='label'>
                    <input
                        hidden
                        accept='image/*'
                        type='file'
                        onChange={(e) => handleChangeImage(e)}
                    />
                    <PhotoCameraRoundedIcon />
                </IconButton>
                <Button variant='contained' endIcon={<SendRoundedIcon />} type='submit'>
                    Đăng
                </Button>
            </Box>
            {image && (
                <PreviewImage>
                    <CancelRoundedIcon
                        sx={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            color: '#fff',
                            cursor: 'pointer',
                        }}
                        onClick={() => setImage(undefined)}
                    />
                    <img src={URL.createObjectURL(image)} alt='image preview' />
                </PreviewImage>
            )}
        </PostFormStyled>
    );
};

export default PostForm;
