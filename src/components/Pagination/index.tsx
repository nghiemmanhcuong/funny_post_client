import {Pagination, Stack} from '@mui/material';
import { ChangeEvent } from 'react';

interface PaginationProps {
    page: number;
    count: number;
    onSetPage:(page:number) => void;
    onReFecthData:() => void;
}

const Panigation = ({page, count,onSetPage,onReFecthData}: PaginationProps) => {
    
    const handleChangePage = (event:ChangeEvent<unknown>,value:number) => {
        onSetPage(value);
        onReFecthData();
    }

    return (    
        <Stack sx={{marginTop: '15px', '& > nav': {display: 'flex', justifyContent: 'center'}}}>
            <Pagination count={count} page={page} color='primary' onChange={handleChangePage}/>
        </Stack>
    );
};

export default Panigation;
