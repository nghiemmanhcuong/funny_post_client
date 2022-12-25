import toastr from 'toastr';
import {Link} from 'react-router-dom';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import {useFollow, useMenu, useUnFollow, useUser} from '../../hooks';

import notAvatar from '../../assets/images/not-avatar.webp';
import {UserClientType} from '../../assets/interfaces';
import {RightBarContactItem} from './styles';
import {Box, IconButton, Menu, MenuItem, Typography} from '@mui/material';

interface ContactItemProps {
    user: UserClientType;
}

const ContactItem = ({user}: ContactItemProps) => {
    const userClient: UserClientType = useUser();
    const {mutate: unFollowMutate} = useUnFollow();
    const {mutate: followMutate} = useFollow();
    const {open, anchorEl, handleOpen, handleClose} = useMenu();

    const handleUnFollow = () => {
        handleClose();
        unFollowMutate(user._id as string);
        toastr.success('Bỏ theo dõi thành công');
    };


    const hanldeFollow = () => {
        followMutate(user._id as string);
        toastr.success(`Theo dõi ${user.lastName} thành công`);
    }

    return (
        <RightBarContactItem>
            <Link to={`/profile/${user._id}`}>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'flex-start'}}>
                    {user.profilePicture ? (
                        <img
                            src={ user.profilePicture}
                            style={{borderRadius: '100%'}}
                        />
                    ) : (
                        <img src={notAvatar} />
                    )}
                    <Typography sx={{marginLeft: '15px'}}>
                        {user.firstName + ' ' + user.lastName}
                    </Typography>
                </Box>
            </Link>
            <IconButton onClick={(e) => handleOpen(e)}>
                <MoreHorizIcon sx={{cursor: 'pointer'}} />
            </IconButton>
            <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
                <MenuItem onClick={handleClose}>
                    <Link to={`/profile/${user._id}`}>Xem trang cá nhân</Link>
                </MenuItem>
                {user.followers?.includes(userClient._id as string) && (
                    <MenuItem onClick={handleUnFollow}>Bỏ theo dõi</MenuItem>
                )}
                {!user.followers?.includes(userClient._id as string) && (
                    <MenuItem onClick={hanldeFollow}>Theo dõi</MenuItem>
                )}
            </Menu>
        </RightBarContactItem>
    );
};

export default ContactItem;
