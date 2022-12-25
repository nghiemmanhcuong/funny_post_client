import {styled} from '@mui/material/styles';

export const PostItemStyled = styled('div')(({theme}) => ({
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

export const PostItemAction = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    columnGap: theme.spacing(1.5),
    paddingTop: theme.spacing(1.5)
}));

export const PostItemInfo = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent:'space-between',
    padding: theme.spacing(1.5,0),
    marginTop: theme.spacing(1.5),
    borderTop: '1px solid rgba(0,0,0,0.1)',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
}))
