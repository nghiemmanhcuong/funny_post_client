import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    ImageList,
    ImageListItem,
    Typography,
} from '@mui/material';
import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {useContext, useEffect} from 'react';
import {getUserImages} from '../../api/user';
import {ModalContext} from '../../store/modal';
import {ModalActionType} from '../../store/type';

const UserImageModal = () => {
    const {modal, closeModal} = useContext(ModalContext);

    const {isLoading, isError, data, refetch}: UseQueryResult<string[], Error> = useQuery({
        queryKey: ['get-images'],
        queryFn: getUserImages,
    });

    useEffect(() => {
        refetch();
    },[])

    return (
        <Dialog
            open={modal.isOpenUserImageModal}
            maxWidth='lg'
            fullWidth
            onClose={() => closeModal(ModalActionType.CLOSE_USER_IMAGE_MODAL)}
        >
            <DialogTitle>Tất cả ảnh của bạn</DialogTitle>
            <DialogContent>
                {isLoading ? (
                    <Typography variant='subtitle1' sx={{textAlign: 'center', marginTop: '15px'}}>
                        Đang tải...
                    </Typography>
                ) : isError ? (
                    <Typography variant='subtitle1' sx={{textAlign: 'center', marginTop: '15px'}}>
                        Có lỗi sảy ra
                    </Typography>
                ) : (
                    <ImageList variant='quilted' cols={3} rowHeight={230}>
                        {data.map((image, index) => (
                            <ImageListItem key={index}>
                                <img src={ image} style={{maxWidth: '100%'}} />
                            </ImageListItem>
                        ))}
                    </ImageList>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    variant='contained'
                    color='secondary'
                    onClick={() => closeModal(ModalActionType.CLOSE_USER_IMAGE_MODAL)}
                >
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserImageModal;
