import { Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../contexts/constants";
import { useState, useEffect } from 'react'
import LoveIcon from '../../assets/love-icon.png'
import DisLikeIcon from '../../assets/dislikes-icon.png'

export default function Post({ post }) {

  const handleView = async (id) => {
    /* const viewPost = await axios.get(`${apiUrl}/post/${id}`)
    if (viewPost.data.success)
      return viewPost.data */
  };

  const [cateName, setCateName] = useState('')

  useEffect(() => {
    const getCategory = async () => {
      const response = await axios.get(
        `${apiUrl}/category/${post.categoryId}`
      );
      if (response.data.success) {
        setCateName(response.data.category.name)
      }
    }
    getCategory()
  }, []);


  return (
    <div className="post-in-rec">
      <Link to={`/post/${post._id}`} className="link" onClick={() => handleView(post._id)}>
        {post.photo &&
          (<img
            className="postImg-in-rec"
            src={post.photo}
            alt=""
          />)
        }
      </Link>
      <div className="postInfo">
        <div className="postCats">
          {/* <Link to={`/?cat=${c.name}`} className="link" key={c._id}>
            <span className="postCat">{c.name}</span>
          </Link> */}
          <span className="postCat">{cateName}</span>
          <span className="postCat">{post.likes} <img src={LoveIcon} style={{height:'15px', width:'15px'}}></img></span>
          <span className="postCat">{post.dislikes} <img src={DisLikeIcon} style={{height:'15px', width:'15px'}}></img></span>
        </div>
        <Link to={`/post/${post._id}`} className="link" onClick={() => handleView(post._id)}>
          <span className="postTitle">{post.title}</span>
        </Link>
        <span className="postDate">{new Date(post.createDate).toDateString()}</span>
      </div>
      <p className="postDesc-rec" style={{fontSize: '14px'}}>
        {post.desc}
      </p>
    </div>
  );
}