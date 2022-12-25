import {ChangeEvent, useState, useEffect, useRef, useContext} from 'react';
import {Link, NavigateFunction, useNavigate} from 'react-router-dom';
import {useQuery, UseQueryResult} from '@tanstack/react-query';

import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Badge,
    Menu,
    MenuItem,
    CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {HeaderContainer, Search, SearchIconWrapper, StyledInputBase} from './styles';
import SearchBox from '../SearchBox';
import NotificationItem from '../NotificationItem';
import NotificationsOffRoundedIcon from '@mui/icons-material/NotificationsOffRounded';

import {useMenu, useSoketIo, useUpdateReadNotification, useUser} from '../../hooks';
import {searchFriends} from '../../api/user';
import {getNotifications} from '../../api/notification';

import {NotificationType, UserClientType} from '../../assets/interfaces';
import getNumberNotification from '../../utils/getNumberNotification';

const Header = () => {
    const socket = useRef<any>();
    const navigate: NavigateFunction = useNavigate();
    const userClient: UserClientType = useUser();
    const [keyword, setKeyword] = useState<string>('');
    const {open, anchorEl, handleOpen, handleClose} = useMenu();
    const {
        open: openNotifiCation,
        anchorEl: notificationBox,
        handleOpen: handleOpenNotification,
        handleClose: handleCloseNotification,
    } = useMenu();

    const {status, data: users}: UseQueryResult<UserClientType[], Error> = useQuery({
        queryKey: ['search-friends', keyword],
        queryFn: () => searchFriends(keyword),
        enabled: Boolean(keyword),
    });

    const {
        isLoading: isLoadingNotification,
        isError: isErrorNotification,
        data: notifications,
        refetch,
    }: UseQueryResult<NotificationType[], Error> = useQuery({
        queryKey: ['get-notifications', userClient._id],
        queryFn: () => getNotifications(userClient._id as string),
        enabled: Boolean(userClient._id),
    });

    const handleSearch = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setKeyword(e.target.value);
    };

    const handleLogout = () => {
        handleClose();
        localStorage.clear();
        navigate('/auth/login');
    };

    useEffect(() => {
        socket.current = useSoketIo();
        socket.current.on('get-all-notification', (userId: string) => {
            if (userId === userClient._id) {
                refetch();
            }
        });
    }, []);

    const {mutate: updateReadNotificationMutate} = useUpdateReadNotification();
    const handleNotificationClick = (notification: NotificationType) => {
        updateReadNotificationMutate(notification._id as string);
        if (notification.link) {
            handleCloseNotification();
            navigate(notification.link);
        }
    };

    return (
        <AppBar position='static'>
            <HeaderContainer maxWidth='xl'>
                <Toolbar>
                    <Typography variant='h6'>
                        <Link to='/'>Funny post</Link>
                    </Typography>
                </Toolbar>
                <Search sx={{position: 'relative'}}>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder='Tìm kiếm bạn bè...'
                        inputProps={{'aria-label': 'search'}}
                        onChange={(e) => handleSearch(e)}
                        value={keyword}
                    />
                    {keyword !== '' && (
                        <SearchBox status={status} data={users as UserClientType[]} />
                    )}
                </Search>
                <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                    <IconButton id='basic-button' size='large' color='inherit' onClick={handleOpen}>
                        <AccountCircle />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                        <MenuItem onClick={handleClose}>
                            <Link to={`/profile/${userClient._id}`}>Trang cá nhân</Link>
                        </MenuItem>
                        {userClient.isAdmin && (
                            <MenuItem>
                                <Link to='/admin'>Quản trị</Link>
                            </MenuItem>
                        )}
                        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                    </Menu>
                    <IconButton size='large' color='inherit' onClick={handleOpenNotification}>
                        <Badge
                            badgeContent={
                                !isLoadingNotification && !isErrorNotification
                                    ? getNumberNotification(notifications)
                                    : 0
                            }
                            color='error'
                        >
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    <Menu
                        anchorEl={notificationBox}
                        open={openNotifiCation}
                        onClose={handleCloseNotification}
                        sx={{'& ul': {paddingTop: 0, paddingBottom: 0}}}
                    >
                        {isLoadingNotification ? (
                            <Box display='flex' alignItems='center' justifyContent='center'>
                                <CircularProgress />
                            </Box>
                        ) : isErrorNotification ? (
                            <Typography textAlign='center' variant='body2'>
                                Có lỗi sảy ra trong quá trình tải dữ liệu
                            </Typography>
                        ) : notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <NotificationItem
                                    key={notification._id}
                                    notification={notification}
                                    handleNotificationClick={handleNotificationClick}
                                />
                            ))
                        ) : (
                            <Box
                                sx={{padding: '10px 20px'}}
                                display='flex'
                                alignItems='center'
                                flexDirection='column'
                            >
                                <NotificationsOffRoundedIcon fontSize='large' color='primary' />
                                <Typography variant='subtitle1'>
                                    Không có thông báo nào hiển thị!
                                </Typography>
                            </Box>
                        )}
                    </Menu>
                </Box>
            </HeaderContainer>
        </AppBar>
    );
};

export default Header;
