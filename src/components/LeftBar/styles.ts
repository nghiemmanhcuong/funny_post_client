import {styled} from '@mui/material/styles';

export const LeftBarHeader = styled('div')(({theme}) => ({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    columnGap: '15px',
    background: '#fff',
    padding: theme.spacing(2, 2, 2, 2),
    borderRadius: '10px',
    marginBottom: theme.spacing(2),
}));

export const LeftBarNav = styled('div')(({theme}) => ({
    background: '#fff',
    borderRadius: '10px',
    '& > :last-child': {
        borderBottom: 'none',
    },
    marginBottom: theme.spacing(2),
    overflow:'hidden'
}));

export const LeftBarNavItem = styled('div')(({theme}) => ({
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    padding: theme.spacing(2, 2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    cursor: 'pointer',
    columnGap:theme.spacing(2), 

    '& > a': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        columnGap:theme.spacing(2), 
    },

    ':hover': {
        background: 'rgba(0,0,0,0.1)',
    },  
}));

export const LeftBarDvertisement = styled('div')(({theme}) => ({
    padding: theme.spacing(2),
    background: '#fff',
    borderRadius: '10px',
}));

export const DvertisementImage = styled('img')(({theme}) => ({
    width: '100%',
    height: '300px',
    borderRadius: '5px',
    objectFit: 'cover',
}));
