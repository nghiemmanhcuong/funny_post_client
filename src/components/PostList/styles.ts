import {styled} from '@mui/material/styles';

export const PostListStyled = styled('div')(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    overflowY: 'auto',
}));

export const PostItemStyled = styled('div')(({theme}) => ({
    background: '#fff',
    padding: theme.spacing(2),
    borderRadius: '10px',

    '& > img': {
        width: '100%',
        marginTop: theme.spacing(1),
        borderRadius: '5px',
    },
}));

export const PostItemAction = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    columnGap: theme.spacing(1.5),
    marginTop: theme.spacing(1)
}));
