import {styled} from '@mui/material/styles';

export const MainLayoutContanier = styled('div')(({theme}) => ({
    display: 'flex',
    justifyContent: 'space-between',
    background:'#F1F2F5',
    gap:theme.spacing(1)
}));

export const SiteBarStyled = styled('div')(({theme}) => ({
    width: '400px',
    padding: theme.spacing(2, 2, 2, 2),
    height: 'calc(100vh - 96px)',
}));

export const MainStyled = styled('div')(({theme}) => ({
    flex: 1,
    padding: theme.spacing(2,0),
    height: 'calc(100vh - 96px)',
    overflowY:'scroll'
}));