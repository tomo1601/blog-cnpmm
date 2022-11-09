import { Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../contexts/constants";
import { useState, useEffect } from 'react'

export default function Post({ post }) {

  const handleView = async (id) => {
    const viewPost = await axios.put(`${apiUrl}/post/${id}`)
    if (viewPost.data.success)
      return viewPost.data
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
    <div className="post">
      {post.photo &&
        (<img
          className="postImg"
          src={post.photo}
          alt=""
        />)
      }
      <div className="postInfo">
        <div className="postCats">
          {/* <Link to={`/?cat=${c.name}`} className="link" key={c._id}>
            <span className="postCat">{c.name}</span>
          </Link> */}
          <span className="postCat">{cateName}</span>
          <span className="postCat">{post.views}</span>
        </div>
        <Link to={`/post/${post._id}`} className="link" onClick={() => handleView(post._id)}>
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">{new Date(post.createDate).toDateString()}</span>
      </div>
      <p className="postDesc">
        {post.desc}
      </p>
    </div>
  );
}