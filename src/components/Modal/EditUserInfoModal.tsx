import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
    TextField,
} from '@mui/material';
import {Dispatch, useEffect} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {UserClientType, UserInfoType} from '../../assets/interfaces';
import { useUpdateUserInfo } from '../../hooks';
import toastr from 'toastr';

interface EditUserInfoModalprops {
    user: UserClientType;
    open: boolean;
    onSetOpen:Dispatch<React.SetStateAction<boolean>>;
}

const EditUserInfoModal = ({user,open,onSetOpen}: EditUserInfoModalprops) => {
    const {mutate:updateUserInfoMutate} = useUpdateUserInfo()
    const {register, handleSubmit, reset} = useForm<UserInfoType>();
    const onSubmit: SubmitHandler<UserInfoType> = (data) => {
        updateUserInfoMutate(data);
        toastr.success('Thay đổi thông tin thành công!')
        onSetOpen(false)
    };

    useEffect(() => {
        reset(user);
    }, [user]);

    return (
        <Dialog open={open} maxWidth='md'>
            <DialogTitle textAlign='center'>Sửa thông tin của bạn</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={2} minWidth={700} paddingTop={1}>
                        <TextField
                            label='Giới thiệu'
                            type='text'
                            {...register('about')}
                            fullWidth
                        />
                        <TextField
                            label='Nơi sống hiện tại'
                            type='text'
                            {...register('livesIn')}
                            fullWidth
                        />
                        <TextField label='Địa chỉ' type='text' {...register('address')} fullWidth />
                        <TextField
                            label='Nơi làm việc'
                            type='text'
                            {...register('worksAt')}
                            fullWidth
                        />
                        <TextField
                            label='Tình trang quan hệ'
                            type='text'
                            {...register('relationships')}
                            fullWidth
                        />
                        <TextField
                            label='Công việc hiện tại'
                            type='text'
                            {...register('job')}
                            fullWidth
                        />
                        <Button type='submit' variant='contained' color='success'>
                            Lưu thay đổi
                        </Button>
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' color='secondary' onClick={() => onSetOpen(false)}>
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditUserInfoModal;
