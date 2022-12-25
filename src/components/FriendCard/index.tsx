import toastr from 'toastr';

import {Box, Button, Card, CardActions, CardContent, CardMedia, Typography} from '@mui/material';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';

import {useCreateNotification, useFollow, useSoketIo, useUser} from '../../hooks';

import {NotificationType, UserClientType} from '../../assets/interfaces';
import notImgae from '../../assets/images/not-avatar.webp';
import { useEffect, useRef } from 'react';

interface FriendCardProps {
    user: UserClientType;
}

const FriendCard = ({user}: FriendCardProps) => {
    const socket = useRef<any>();
    const userClient: UserClientType = useUser();
    const {mutate: followMutate} = useFollow();
    const {mutate: createNotificationMutate} = useCreateNotification();

    useEffect(() => {
        socket.current = useSoketIo();
    }, []);

    const hanldeFollow = () => {
        const notification:NotificationType = {
            senderId: userClient._id as string,
            receiverId: user._id as string,
            content: `${userClient.firstName} ${userClient.lastName} Đã bắt đầu theo dõi bạn`,
            link: `/profile/${userClient._id}`,
        };

        followMutate(user._id as string);
        createNotificationMutate(notification);
        toastr.success(`Theo dõi ${user.lastName} thành công`);
        socket.current.emit('send-notification',notification.receiverId)
    };

    return (
        <Card sx={{maxWidth: '280px'}}>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                {user.profilePicture ? (
                    <CardMedia
                        component='img'
                        sx={{borderRadius: '100%', height: '100px', maxWidth: '100px'}}
                        src={ user.profilePicture}
                    />
                ) : (
                    <CardMedia component='img' height='100' sx={{width: 'unset'}} src={notImgae} />
                )}
            </Box>
            <CardContent sx={{padding: '5px 10px'}}>
                <Typography variant='subtitle1' sx={{textAlign: 'center'}}>
                    {user.firstName + ' ' + user.lastName}
                </Typography>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
                {user.followers?.includes(userClient._id as string) ? (
                    <Button
                        sx={{fontSize: '11px'}}
                        color='success'
                        variant='contained'
                        endIcon={<GroupRoundedIcon />}
                        onClick={() => followMutate(user._id as string)}
                    >
                        Trang cá nhân
                    </Button>
                ) : (
                    <Button
                        sx={{fontSize: '11px'}}
                        color='primary'
                        variant='contained'
                        endIcon={<PersonAddAltRoundedIcon />}
                        onClick={hanldeFollow}
                    >
                        Theo dõi ngay
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default FriendCard;
