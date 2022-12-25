import {styled} from '@mui/material/styles';

export const RightBarContactItem = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    padding: theme.spacing(1,2),
    'img': {
        width:'35px',
        height:'35px',
        objectFit:'cover',
        borderRadius: '5px'
    },

    ':hover': {
        background: 'rgba(0,0,0,0.1)',
    }, 
}))