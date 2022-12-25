import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {useContext, useState} from 'react';
import FriendCard from '../FriendCard';
import Pagination from '../Pagination';

import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Typography,
} from '@mui/material';
import {getUser} from '../../api/user';
import {UserClientType} from '../../assets/interfaces';
import {ModalContext} from '../../store/modal';
import {ModalActionType} from '../../store/type';

interface ResponseGetUserType {
    success: boolean;
    data: UserClientType[];
    pages: number;
}

const AddFriendsModal = () => {
    const {modal, closeModal} = useContext(ModalContext);
    const [page, setPage] = useState<number>(1);

    const {isLoading, isError, data, refetch}: UseQueryResult<ResponseGetUserType, Error> =
        useQuery({
            queryKey: ['get-friends', page],
            queryFn: () => getUser(page),
        });

    return isLoading ? (
        <Box display='flex' alignItems='center' justifyContent='center'>
            <CircularProgress />
        </Box>
    ) : isError ? (
        <Typography variant='subtitle1'></Typography>
    ) : (
        <Dialog
            open={modal.isOpenAddFriendModal}
            onClose={() => closeModal(ModalActionType.CLOSE_ADD_FRIEND_MODAL)}
            maxWidth='xl'
        >
            <DialogTitle
                id='alert-dialog-title'
                sx={{fontSize: '26px', fontWeight: 'bold', textAlign: 'center'}}
            >
                Thêm những người bạn mới đi nào!
            </DialogTitle>
            <DialogContent sx={{minWidth: '1170px', maxWidth: '1170px', minHeight: '450px'}}>
                <Grid container rowSpacing={2}>
                    {data!.data.map((user) => (
                        <Grid item key={user._id} xs={3}>
                            <FriendCard user={user}/>
                        </Grid>
                    ))}
                </Grid>
                <Pagination
                    count={data.pages}
                    page={page}
                    onSetPage={setPage}
                    onReFecthData={refetch}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => closeModal(ModalActionType.CLOSE_ADD_FRIEND_MODAL)}
                >
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddFriendsModal;
