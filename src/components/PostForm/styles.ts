import {styled} from '@mui/material/styles';

export const PostFormStyled = styled('form')(({theme}) => ({
    background: '#fff',
    padding: theme.spacing(1.5),
    borderRadius: '10px',
    zIndex: 100,
    marginBottom: theme.spacing(2),

    '& > div': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    '& > div > .user_avatar': {
        width: '40px',
        height: '40px',
        borderRadius: '3px',
        objectFit: 'cover',
    },

    '& > div > input': {
        flex: 1,
        height: '40px',
        border: 'none',
        outline: 'none',
        resize: 'none',
        paddingLeft: theme.spacing(1),
    },
}));

export const PreviewImage = styled('div')(({theme}) => ({
    marginTop: theme.spacing(2),
    position:'relative',
    backgroundColor:'rgba(0,0,0,0.1)',

    '& > img': {
        width: '100%',
        height: '400px',
        objectFit: 'contain',
    },
}));
