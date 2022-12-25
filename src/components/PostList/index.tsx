import {PostListStyled} from './styles';
import PostItem from '../PostItem';
import { PostType } from '../../assets/interfaces';
import { useEffect, useRef } from 'react';
import { useSoketIo } from '../../hooks';

interface PostListProps {
    data:PostType[]
}

const PostList = ({data}:PostListProps) => {
    return (
        <PostListStyled>
            {data.map((post, index) => (
                <PostItem key={index} post={post}/>
            ))}
        </PostListStyled>
    )
};

export default PostList;
