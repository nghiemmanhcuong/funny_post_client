import {useState} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import toastr from 'toastr';

import {register as registerFn} from '../../api/auth.js';
import {InputRegisterType} from '../../assets/interfaces';

import {Box, Button, CircularProgress, Stack, TextField, Typography} from '@mui/material';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<InputRegisterType>();
    
    const onSubmit: SubmitHandler<InputRegisterType> = async (data) => {
        try {
            setLoading(true);
            const res = await registerFn(data);
            if (res.data) {
                setLoading(false);
                toastr.success('Đăng ký tài khoản thành công');
                navigate('/auth/login');
            }
        } catch (error) {
            toastr.error(error.response.data.message);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
                <Box sx={{width: 500}}>
                    <TextField
                        fullWidth
                        label='Họ'
                        type='text'
                        {...register('firstName', {required: true})}
                    />
                    {errors.firstName && (
                        <Typography sx={{color: 'red'}} variant='caption'>
                            Họ không được để trống
                        </Typography>
                    )}
                </Box>
                <Box sx={{width: 500}}>
                    <TextField
                        fullWidth
                        label='Tên'
                        type='text'
                        {...register('lastName', {required: true})}
                    />
                    {errors.lastName && (
                        <Typography sx={{color: 'red'}} variant='caption'>
                            Tên không được để trống
                        </Typography>
                    )}
                </Box>
                <Box sx={{width: 500}}>
                    <TextField
                        fullWidth
                        label='Email'
                        type='text'
                        {...register('email', {required: true})}
                    />
                    {errors.email && (
                        <Typography sx={{color: 'red'}} variant='caption'>
                            Email không được để trống
                        </Typography>
                    )}
                </Box>
                <Box sx={{width: 500}}>
                    <TextField
                        fullWidth
                        label='Mật khẩu'
                        type='password'
                        {...register('password', {required: true})}
                    />
                    {errors.password && (
                        <Typography sx={{color: 'red'}} variant='caption'>
                            Mật khẩu không được để trống
                        </Typography>
                    )}
                </Box>
                <Typography variant='subtitle1' sx={{'&>a': {color: 'blue'}}}>
                    Bạn đã có tài khoản? <Link to='/auth/login'>Đăng nhập</Link>
                </Typography>
                <Button variant='contained' type='submit'>
                    {loading ? <CircularProgress color='success' /> : 'Đăng ký'}
                </Button>
            </Stack>
        </form>
    );
};

export default Register;
