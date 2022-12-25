import HouseRoundedIcon from '@mui/icons-material/HouseRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import PhotoRoundedIcon from '@mui/icons-material/PhotoRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import CircleNotificationsRoundedIcon from '@mui/icons-material/CircleNotificationsRounded';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import {Avatar, Badge, Box, Typography} from '@mui/material';
import {
    DvertisementImage,
    LeftBarDvertisement,
    LeftBarHeader,
    LeftBarNav,
    LeftBarNavItem,
} from './styles';
import notAvatar from '../../assets/images/not-avatar.webp';
import {Link, useNavigate} from 'react-router-dom';
import {useUser} from '../../hooks';
import {UserClientType} from '../../assets/interfaces';
import {ModalContext} from '../../store/modal';
import {useContext} from 'react';
import {ModalActionType} from '../../store/type';

const LeftBar = () => {
    const navigate = useNavigate();
    const userClient: UserClientType = useUser();
    const {openModal} = useContext(ModalContext);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/auth/login');
    };

    return (
        <>
            <LeftBarHeader>
                {userClient.profilePicture ? (
                    <Link to={`/profile/${userClient._id}`}>
                        <Avatar src={ userClient.profilePicture} />
                    </Link>
                ) : (
                    <Link to={`/profile/${userClient._id}`}>
                        <Avatar src={notAvatar} />
                    </Link>
                )}
                <Box>
                    <Link to={`/profile/${userClient._id}`}>
                        <Typography variant='subtitle1'>
                            {userClient.firstName + ' ' + userClient.lastName}
                        </Typography>
                        <Typography variant='body2'>{userClient.email}</Typography>
                    </Link>
                </Box>
            </LeftBarHeader>
            <LeftBarNav>
                <LeftBarNavItem>
                    <Link to='/'>
                        <HouseRoundedIcon />
                        <Typography variant='subtitle1'>Trang chủ</Typography>
                    </Link>
                </LeftBarNavItem>
                <LeftBarNavItem onClick={() => openModal(ModalActionType.OPEN_ADD_FRIEND_MODAL)}>
                    <PeopleAltRoundedIcon />
                    <Typography variant='subtitle1'>Thêm bạn bè</Typography>
                </LeftBarNavItem>
                <LeftBarNavItem onClick={() => openModal(ModalActionType.OPEN_USER_IMAGE_MODAL)}>
                    <PhotoRoundedIcon />
                    <Typography sx={{fontWeight: 500}} variant='subtitle1'>
                        Ảnh của bạn
                    </Typography>
                </LeftBarNavItem>
                <LeftBarNavItem>
                    <Link to={`/profile/${userClient._id}`}>
                        <AccountCircleRoundedIcon />
                        <Typography variant='subtitle1'>Hồ sơ</Typography>
                    </Link>
                </LeftBarNavItem>
                <LeftBarNavItem onClick={handleLogout}>
                    <ExitToAppRoundedIcon />
                    <Typography variant='subtitle1'>Đăng xuất</Typography>
                </LeftBarNavItem>
            </LeftBarNav>
            <LeftBarDvertisement>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '10px',
                    }}
                >
                    <Typography variant='subtitle1'>Quảng cáo</Typography>
                    <Badge badgeContent={4} color='secondary'>
                        <CircleNotificationsRoundedIcon />
                    </Badge>
                </Box>
                <DvertisementImage src='https://missluxury.vn/wp-content/uploads/2021/11/8bf4e06f5cd56ba167f4dc2fcdec5e69.jpg' />
            </LeftBarDvertisement>
        </>
    );
};

export default LeftBar;
