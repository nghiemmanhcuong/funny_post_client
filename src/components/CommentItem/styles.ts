import { styled } from "@mui/material"

export const CommentItemWap = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    columnGap: theme.spacing(1),

    '& > *' : {
        marginBottom: theme.spacing(2)
    }
}))

export const CommentItemInfo = styled('div')(({theme}) => ({
    borderRadius: '30px',
    backgroundColor:theme.palette.grey[300],
    padding: theme.spacing(0.3,2),

    '& > h6' : {
        fontSize:'14px',
        fontWeight:600,
    },
    '& > p' : {
        fontSize:'13px'
    }
}))