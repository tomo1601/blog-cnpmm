import React from 'react'
import { useContext, useEffect, useState } from 'react'
import { PostContext } from '../../contexts/PostContext'
import { useParams } from "react-router-dom";
import Post from "./Post";

const PostDetail = () => {
    let { id } = useParams()

    const {getPostById} = useContext(PostContext);

    const [post, setPost] = useState({})
    
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await getPostById(id);
            setPost(res);
          };
          fetchPosts();
          
    }, [id]);
    
    return (
        <div><Post post={post} key={post._id}/> </div>
    )
}

export default PostDetail