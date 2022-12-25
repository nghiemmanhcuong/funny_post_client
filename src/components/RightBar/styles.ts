import {styled} from '@mui/material/styles';

export const RightBarHeader =styled('div')(({theme}) => ({
    background:'#fff',
    borderRadius:'10px',
    '& > img': {
        width:'50px',
        height:'50px',
    },
    display: 'flex',
    gap:theme.spacing(1.5),
    marginBottom:theme.spacing(2),
    padding: theme.spacing(2),
}))

export const RightBarContacts =styled('div')(({theme}) => ({
    background:'#fff',
    borderRadius:'10px',
    height:695,
    overflowY:'scroll',
}))