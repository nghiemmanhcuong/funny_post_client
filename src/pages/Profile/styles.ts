import {styled} from '@mui/material/styles';

export const ProfileBody = styled('div')(({theme}) => ({
    marginTop: theme.spacing(2),
}));

export const ProfileLoadingBox = styled('div')(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
}));