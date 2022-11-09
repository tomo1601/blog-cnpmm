import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'
import { useParams } from "react-router-dom";
import SinglePost from './SinglePost';

const PostDetail = () => {
    let { id } = useParams()

    const {getPostById} = useContext(PostContext);

    const [post, setPost] = useState({})
    
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await getPostById(id);
            setPost(res.post);
          };
          fetchPosts();
          
    }, [id]);
    
    return (
        <div><SinglePost post={post} key={id}/></div>
    )
}

export default PostDetail