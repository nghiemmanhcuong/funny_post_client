import {Box, Button, CircularProgress, Stack, TextField, Typography} from '@mui/material';
import {useState} from 'react';
import {useForm, SubmitHandler} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import toastr from 'toastr';

import {login} from '../../api/auth';

import {InputLoginType} from '../../assets/interfaces';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<InputLoginType>();

    const Onsubmit: SubmitHandler<InputLoginType> = async (data) => {
        try {
            setLoading(true);
            const res: any = await login(data);
            if (res.data) {
                setLoading(false);
                toastr.success('Chào mừng bạn đến với Funny Post');
                localStorage.setItem('token', JSON.stringify(res.token));
                localStorage.setItem('user', JSON.stringify(res.data));
                navigate('/');
            }
        } catch (error) {
            toastr.error(error.response.data.message);
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(Onsubmit)}>
            <Stack spacing={2}>
                <Box sx={{width: 500}}>
                    <TextField
                        fullWidth
                        label='Email'
                        type='email'
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
                    Bạn chưa có tài khoản? <Link to='/auth/register'>Đăng ký</Link>
                </Typography>
                <Button variant='contained' type='submit'>
                    {loading ? <CircularProgress color='success' /> : 'Đăng nhập'}
                </Button>
            </Stack>
        </form>
    );
};

export default Login;
