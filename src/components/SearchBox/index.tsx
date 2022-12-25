import {Box, CircularProgress, Typography} from '@mui/material';
import {UserClientType} from '../../assets/interfaces';
import ContactItem from '../ContactItem';
import {SearchBoxResults, SearchBoxWap} from './styles';

interface SearchBoxProps {
    status: 'error' | 'success' | 'loading';
    data: UserClientType[];
}

const SearchBox = ({status, data}: SearchBoxProps) => {

    return (
        <SearchBoxWap>
            {status === 'loading' ? (
                <Box display='flex' alignItems='center' justifyContent='center'>
                    <CircularProgress color='primary' />
                </Box>
            ) : status === 'error' ? (
                <Typography textAlign='center'>Có lỗi sảy ra trong quá trình tải dữ liệu</Typography>
            ) : data.length > 0 ? (
                <SearchBoxResults>
                    {data.map(user => (
                        <ContactItem user={user} key={user._id}/>
                    ))}
                </SearchBoxResults>
            ) : (
                <Typography textAlign='center'>Không tìm thấy kết quả nào!</Typography>
            )}
        </SearchBoxWap>
    );
};

export default SearchBox;
