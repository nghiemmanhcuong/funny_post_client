import {styled} from '@mui/material/styles';
import {Grid, Typography} from '@mui/material';

export const AuthContainer = styled('div')(({theme}) => ({
    background: '#1875D1',
    height: '100vh',
    overflow: 'hidden',
}));

export const AuthForm = styled('div')(({theme}) => ({
    background: '#fff',
    padding: theme.spacing(3),
    borderRadius: '10px',

    '& > h5': {
        textAlign: 'center',
        marginBottom: '20px',
        fontWeight: 600,
    },
}));

export const GridItemStyled = styled(Grid)(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
}));

export const WellcomeTextStyled = styled(Typography)(({theme}) => ({
    fontWeight: 600,
    lineHeight: '76px',
    color: '#fff',
    '&>span': {fontFamily: `'Pacifico', cursive`, fontSize: '62px'},
}));
