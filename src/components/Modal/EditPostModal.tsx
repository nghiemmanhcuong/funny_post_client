import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from '@mui/material';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import axios from 'axios';
import {ChangeEvent, useContext, useEffect, useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {getPostById} from '../../api/post';
import {NewPostType, PostType} from '../../assets/interfaces';
import {useUpdatePost} from '../../hooks';
import {ModalContext} from '../../store/modal';
import {ModalActionType} from '../../store/type';
import toastr from 'toastr';
import uploadImage from '../../utils/uploadImage';

const EditPostModal = () => {
    const {mutate: updatePostMutate} = useUpdatePost();
    const {modal, closeModal} = useContext(ModalContext);
    const [newImg, setNewImg] = useState<File | null>(null);
    const postId: string = JSON.parse(localStorage.getItem('post-id') || 'null');

    const {isLoading, isError, data, refetch}: UseQueryResult<PostType, Error> = useQuery({
        queryKey: ['get-post', postId],
        queryFn: () => getPostById(postId),
        enabled: false,
    });

    useEffect(() => {
        if (postId) {
            refetch();
        }
    }, [postId]);

    useEffect(() => {
        if (data) {
            reset({
                description: data.description,
                image: data.image,
            });
        }
    }, [data]);

    const {handleSubmit, register, reset} = useForm<NewPostType>();
    const Submit: SubmitHandler<NewPostType> = async (data) => {
        const newPost: NewPostType = data;
        if(newImg) {
            const postImage = await uploadImage(newImg);
            newPost.image = postImage;
        }
        updatePostMutate({
            postId,
            data: newPost,
        });
        handleCloseEditPostModal();
        toastr.success('Sửa bài viết thành công');
    };

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setNewImg(file);
            e.target.value = '';
        }
    };

    const handleCloseEditPostModal = () => {
        localStorage.removeItem('post-id');
        setNewImg(null);
        closeModal(ModalActionType.CLOSE_EDIT_POST_MODAL);
    };

    return (
        <Dialog
            open={modal.isOpenEditPostModal}
            onClose={handleCloseEditPostModal}
            maxWidth='md'
            fullWidth
        >
            <DialogTitle>Chỉnh sửa bài viết</DialogTitle>
            <DialogContent>
                {!isLoading && !isError ? (
                    <form onSubmit={handleSubmit(Submit)}>
                        <Stack spacing={2}>
                            <TextField type='text' {...register('description')} />
                            {data!.image && !newImg && (
                                <img
                                    src={ data!.image}
                                    style={{maxWidth: '100%', height: '470px', objectFit: 'cover'}}
                                />
                            )}
                            {newImg && (
                                <img
                                    src={URL.createObjectURL(newImg)}
                                    style={{maxWidth: '100%', height: '470px', objectFit: 'cover'}}
                                />
                            )}
                            <input type='hidden' {...register('image')} />
                            <Stack spacing={2}>
                                <Button variant='contained' component='label'>
                                    {data!.image ? 'Sửa ảnh' : 'Thêm ảnh'}
                                    <input
                                        hidden
                                        accept='image/*'
                                        multiple
                                        type='file'
                                        onChange={handleChangeImage}
                                    />
                                </Button>
                                <Button variant='contained' color='success' type='submit'>
                                    Lưu bài viết
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                ) : (
                    <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
                        <CircularProgress />
                    </Box>
                )}
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='secondary' onClick={handleCloseEditPostModal}>
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditPostModal;
