import { Link } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../contexts/constants";
import { useState, useEffect, useContext } from 'react'
import Button from "react-bootstrap/Button";
import { PostContext } from "../../contexts/PostContext"
import { AuthContext } from "../../contexts/AuthContext"
import { useToast } from "../../contexts/Toast"

export default function Post({ post }) {

  const handleView = async (id) => {
    /* const viewPost = await axios.get(`${apiUrl}/post/${id}`)
    if (viewPost.data.success)
      return viewPost.data */
  };

  const { error, success } = useToast();
  const { deletePost } = useContext(PostContext)

  const [postWillDelete, setPostWillDelete] = useState({
    id:[post._id]
  })

  const deleteFunction = async (event) => {
    event.preventDefault();
    try {
      const response = await deletePost(postWillDelete);
      if (response.success) {
        success('Deleted post successfully!')
      } else {
        error('Deleted post fail!')
      }
    } catch (error) {
      console.log(error);
    }
  }

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
    <div className="post-in-profile">
      <Link to={`/post/${post._id}`} className="link" onClick={() => handleView(post._id)}>
        {post.photo &&
          (<img
            className="postImg-in-profile"
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
          <span className="postCat">{post.views}</span>
        </div>
        <Link to={`/post/${post._id}`} className="link" onClick={() => handleView(post._id)}>
          <span className="postTitle">{post.title}</span>
        </Link>
        <span className="postDate">{new Date(post.createDate).toDateString()}</span>
      </div>
      <p className="postDesc">
        {post.desc}
      </p>
      <Button style={{ margin: '0 5px' }} onClick={deleteFunction}>Delete</Button>
      <Link to={`/post/update/${post._id}`}>
        <Button>Edit</Button>
      </Link>
    </div>
  );
}