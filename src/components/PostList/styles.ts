import {styled} from '@mui/material/styles';

export const PostListStyled = styled('div')(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    overflowY: 'auto',
}));

export const WellcomCardStyled = styled('div')(({theme}) => ({
    background: '#fff',
    padding: theme.spacing(2),
    borderRadius: '10px',

    '& > .post-image': {
        borderRadius: '5px',
        marginTop: theme.spacing(1)
    },

    '& > .post-image > img': {
        width: '100%',
        borderRadius: '5px',
        maxHeight:'435px',
        objectFit:'contain'
    },
}));