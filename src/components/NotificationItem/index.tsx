import {NotificationItemWap} from './styles';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import {Avatar, Box, IconButton, MenuItem, Tooltip, Typography} from '@mui/material';
import {NotificationType} from '../../assets/interfaces';
import {format} from 'timeago.js';

import notAvatar from '../../assets/images/not-avatar.webp';
import {useDeleteNotification} from '../../hooks';

interface NotificationItemProps {
    notification: NotificationType;
    handleNotificationClick: (notification: NotificationType) => void;
}

const NotificationItem = ({notification, handleNotificationClick}: NotificationItemProps) => {
    const {mutate: deleteNotificationMutate} = useDeleteNotification();

    return (
        <MenuItem sx={{padding: 0}}>
            <NotificationItemWap
                sx={{
                    background: `${notification.read ? 'white' : 'rgba(0,0,0,0.1)'}`,
                }}
            >
                <Box
                    display='flex'
                    alignItems='center'
                    columnGap={1}
                    onClick={() => handleNotificationClick(notification)}
                >
                    {notification.user?.profilePicture ? (
                        <Avatar src={ notification.user?.profilePicture} />
                    ) : (
                        <Avatar src={notAvatar} />
                    )}
                    <Box>
                        <Typography variant='subtitle1' sx={{fontSize: '14px', fontWeight: 600}}>
                            {notification.user?.firstName + ' ' + notification.user?.lastName}
                            <Typography variant='caption' sx={{fontSize: '10px', color: 'gray',paddingLeft: '10px'}}>
                                {format(notification.createdAt as Date, 'vi_VN')}
                            </Typography>
                        </Typography>
                        <Typography sx={{fontSize: '13px'}} variant='caption'>
                            {notification.content}
                        </Typography>
                    </Box>
                </Box>
                <Tooltip title='Xoá' placement='right'>
                    <IconButton
                        onClick={() => deleteNotificationMutate(notification._id as string)}
                    >
                        <DeleteForeverRoundedIcon color='secondary' />
                    </IconButton>
                </Tooltip>
            </NotificationItemWap>
        </MenuItem>
    );
};

export default NotificationItem;
