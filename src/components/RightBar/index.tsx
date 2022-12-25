import {useQuery, UseQueryResult} from '@tanstack/react-query';

import {Box, CircularProgress, Typography} from '@mui/material';
import {RightBarHeader, RightBarContacts} from './styles';

import {getFriends} from '../../api/user';

import {UserClientType} from '../../assets/interfaces';
import ContactItem from '../ContactItem';

const RightBar = () => {
    const {isLoading, isError, data}: UseQueryResult<UserClientType[], Error> = useQuery({
        queryKey: ['get-current-user-friends'],
        queryFn: getFriends,
    });

    return (
        <div>
            <RightBarHeader>
                <img
                    src='https://png.pngtree.com/png-vector/20190121/ourlarge/pngtree-holiday-gift-gift-box-cartoon-gift-box-png-image_519736.jpg'
                    alt=''
                />
                <Box sx={{flex: 1}}>
                    <Typography variant='body1'>
                        Hôm này là sinh nhật của <strong>Cường</strong>,<strong>Trung Hiếu</strong>{' '}
                        hãy gửi lời chúc đến họ!!!
                    </Typography>
                </Box>
            </RightBarHeader>
            <RightBarContacts>
                {isLoading ? (
                    <Box display='flex' alignItems='center' justifyContent='center'>
                        <CircularProgress color='primary' />
                    </Box>
                ) : isError ? (
                    <Typography sx={{textAlign: 'center', marginTop: '15px'}}>
                        Có lỗi sảy ra trong quá trình tải dữ liệu
                    </Typography>
                ) : (
                    data.map((user, index) => <ContactItem user={user} key={index} />)
                )}
            </RightBarContacts>
        </div>
    );
};

export default RightBar;
