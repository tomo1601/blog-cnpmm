import { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Edit, Delete } from "@mui/icons-material";
import CommentExampleComment from "./Comment"
import TextareaAutosize from 'react-textarea-autosize';
import { Fab } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import Badge from '@mui/material/Badge';
import { FacebookShareButton } from "react-share";
import { PostContext } from "../../contexts/PostContext";
import axios from "axios";
import { apiUrl } from "../../contexts/constants";
import Topbar from "./TopBar";

export default function SinglePost() {

  let { id } = useParams()
  const myRef = useRef(null);

  const executeScroll = () => myRef.current.scrollIntoView()

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState();
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState(0);
  const [updateMode, setUpdateMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const { getPostById } = useContext(PostContext)

  useEffect(() => {
    const getPost = async () => {
      const res = await getPostById(id);
      const getCategory = async () => {
        const response = await axios.get(
          `${apiUrl}/category/${res.post.categoryId}`
        );
        if (response.data.success) {
          setCategory(response.data.category.name)
        }
      }

      getCategory()
      setPost(res.post);
      setTitle(res.post.title);
      setDescription(res.post.desc);
      setLikes(res.post.likes);
      setLoading(!post ? true : false);
    };
    const checkLike = async () => {
      /* const res = await FeelingService.checkFeeling({postId: path});
      setLike(res.data.data.feeling ? true : false); */
    }
    getPost();
    checkLike();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, like]);

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this account?");
    if (confirm) {
      try {
        /* await PostService.deleteById(post._id); */
        window.location.replace("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      /* await PostService.updatePost(post._id, {
        title,
        description,
        category,
      }); */
      setUpdateMode(false)
    } catch (err) { }
  };

  const handleLike = async () => {
    /* const res = await FeelingService.createFeeling({
      postId: post._id,
      type: 'like'
    })
    Object.getOwnPropertyNames(res.data.data).length === 0 ? setLike(false) : setLike(true) */
  }
  return (
    <>
      {!loading ? (
        <div className="singlePost">
          <div style={{ display: "flex", flexDirection: "column", padding: "20px", width: "15%", marginLeft: "20px" }}>
            <div style={{ position: "sticky", top: "120px" }}>
              <FacebookShareButton url={window.location.href}
                quote={"All is good"}
                hashtag={"#hashtag"}
                description={"idk"}
                className="Demo__some-network__share-button">
                <Fab aria-label="share" style={{ margin: "20px 0px", backgroundColor: "#F2F6FF" }}>
                  <CreateOutlinedIcon />
                </Fab>
              </FacebookShareButton>
              <Fab aria-label="edit" style={{ margin: "20px 0px", backgroundColor: "#F2F6FF" }} onClick={executeScroll}>
                <ChatBubbleOutlineOutlinedIcon />
              </Fab>
              <Badge badgeContent={likes} color="primary" style={{ margin: "20px 0px" }}>
                <Fab aria-label="like" style={{ backgroundColor: "#F2F6FF" }} onClick={handleLike}>
                  <FavoriteIcon color={like ? 'primary' : 'default'} />
                </Fab>
              </Badge>
            </div>


          </div>
          <div className="singlePostWrapper">
            <img src={post.photo} alt="" className="singlePostImg" />
            {updateMode ? (
              <input
                type="text"
                value={title}
                className="singlePostTitleInput"
                autoFocus
                onChange={(e) => setTitle(e.target.value)}
              />
            ) : (
              <h1 className="singlePostTitle">
                {title}
                {post.userId._id === user?._id &&
                  (<div className="singlePostEdit">
                    <Edit className="singlePostIcon" onClick={() => setUpdateMode(true)} />
                    <Delete className="singlePostIcon" onClick={handleDelete} />
                  </div>)}
              </h1>
            )}
            <div className="singlePostInfo">
              <span className="singlePostAuthor">
                Author:{" "}
                <Link to={`/user/${post.userId._id}`} className="link">
                  <b>{post.userId.fullname}</b>
                </Link>
              </span>
              <span className="singlePostCats">
                Category: {category}
                {/* <Link to={`/?cat=${c.name}`} className="link" key={c._id}>
            <span className="postCat">{c.name}</span>
          </Link> */}
                <span className="singlePostCats">{post.categoryId.title}</span>
              </span>
              <span className="singlePostCats">
                Likes:{" "}
                <span className="singlePostCats">{post.likes}</span>
              </span>

              <span className="singlePostDate">
                {new Date(post.createDate).toDateString()}
              </span>
            </div>
            {updateMode ? (
              <TextareaAutosize
                className="singlePostDescInput"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            ) : (
              <p className="singlePostDesc">{description}</p>
            )}
            {updateMode && (
              <button className="singlePostButton" onClick={handleUpdate}>
                Update
              </button>
            )}
            <div ref={myRef}><CommentExampleComment /></div>
          </div>
          <div className='post-relatetion'> There are no related posts</div>
        </div>
      ) : null
      }
    </>

  );
}