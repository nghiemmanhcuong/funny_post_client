import {styled} from '@mui/material/styles';

export const ProfileHeaderWap = styled('div')(({theme}) => ({
    position: 'relative',
    background: '#fff',
    paddingBottom: theme.spacing(1.3),
    borderRadius: '0 0 10px 10px',
}));

export const FollowBox = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
}));

export const ProfileInfoHeader = styled('div')(({theme}) => ({
    paddingLeft: '145px',

    '& > .info-name': {
        display: 'flex',
        alignItems: 'center',

        '& > h6': {
            fontWeight: 600,
            fontSize: '22px',
        },
    },
}));

export const ProfileAvatarWap = styled('div')(({theme}) => ({
    padding: '5px',
    borderRadius: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 115,
    left: '20px',
    background: '#fff',

    '& > .avatar': {
        width: 110,
        height: 110,
        borderRadius: '100%',
        objectFit: 'cover'
    },

    '& > .upload-avatar': {
        position: 'absolute',
        right: '8px',
        bottom:2,
        background: '#fff',
        padding:2,
        borderRadius:'100%',
        cursor: 'pointer',
    }
}));


export const ProfileCoverPictureWap = styled('div')(({theme}) => ({
    position: 'relative',

    '& > .cover_img': {
        borderRadius: '10px 10px 0 0',
        width: '100%',
        height: '250px',
        objectFit: 'cover',
    },

    '& > .upload-cover-picture': {
        position: 'absolute',
        right: '0px',
        bottom:5,
        background: '#fff',
        borderRadius:'100%',
        cursor: 'pointer',
        width: '30px',
        height: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}))