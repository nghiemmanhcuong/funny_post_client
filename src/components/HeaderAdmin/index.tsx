import {AppBar, Box, Container, Toolbar, Typography} from '@mui/material';
import {Link} from 'react-router-dom';

const HeaderAdmin = () => {
    return (
        <AppBar component='nav'>
            <Container maxWidth='xl'>
                <Toolbar sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <Typography variant='h6'>
                        <Link to='/admin'>
                            Funny Post
                        </Link>
                    </Typography>
                    <Box display='flex' alignItems='center' columnGap={2}>
                        <Typography>
                            <Link to='/'>Về trang chủ</Link>
                        </Typography>
                        <Typography>
                            <Link to='/'>Người dùng</Link>
                        </Typography>
                        <Typography>
                            <Link to='/'></Link>
                        </Typography>   
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default HeaderAdmin;
