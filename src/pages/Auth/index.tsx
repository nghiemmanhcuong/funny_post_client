import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import {Container, Grid, Typography} from '@mui/material';
import {AuthContainer, AuthForm, GridItemStyled, WellcomeTextStyled} from './styles';
import Login from '../../components/Login';
import Register from '../../components/Register';

const Auth = () => {
    const {page} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/');
        }
    }, []);

    return (
        <AuthContainer>
            <Container maxWidth='lg'>
                <Grid container spacing={4}>
                    <GridItemStyled item xs={6}>
                        <WellcomeTextStyled variant='h2'>
                            Chào mừng bạn đến với <span>Funny Post</span>
                        </WellcomeTextStyled>
                    </GridItemStyled>
                    <GridItemStyled item xs={6}>
                        <AuthForm>
                            <Typography variant='h5'>
                                {page == 'login' ? 'Đăng nhập' : 'Đăng ký'}
                            </Typography>
                            {page == 'login' ? <Login /> : <Register />}
                        </AuthForm>
                    </GridItemStyled>
                </Grid>
            </Container>
        </AuthContainer>
    );
};

export default Auth;
