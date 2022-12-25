import {styled} from '@mui/material/styles';

export const SearchBoxWap = styled('div')(({theme}) => ({
    position: 'absolute',
    background:'#fff',
    padding:theme.spacing(2),
    boxShadow:theme.shadows[2],
    right:0,
    left:0,
    zIndex:100,
    borderRadius:'0 0 5px 5px',
    color:'black'
}))

export const SearchBoxResults = styled('div')(({theme}) => ({
    
}))