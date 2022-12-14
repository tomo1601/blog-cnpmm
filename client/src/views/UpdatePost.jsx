import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Image } from "@mui/icons-material";
import { useToast } from '../contexts/Toast';
import 'react-toastify/dist/ReactToastify.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { AuthContext } from "../contexts/AuthContext";
import { PostContext } from "../contexts/PostContext";
import { Link } from "react-router-dom";
import axios from "axios"
import { apiUrl } from "../contexts/constants"
import ImgEx from '../assets/eximg.png'

const UpdatePost = () => {

    let { id } = useParams()
    const { error, success } = useToast();
    const { authState: { user }, getCateById } = useContext(AuthContext);
    const { createPost, getPostById, updatePost } = useContext(PostContext)
    const [cats, setCategory] = useState([])
    const [catName, setCatName] = useState('')
    
    const [post, setPost] = useState({
        title: '',
        categoryId: '',
        desc: '',
        photo: ''
    });
    console.log(post)
    const { title, categoryId, desc, photo } = post

    const onChangePost = (event) =>
        setPost({
            ...post, [event.target.name]: event.target.value,
        });
    
    const onChangeSelectCate = (event) => {
        setPost({
            ...post,
            categoryId: event.target.value
        });
    }
    useEffect(() => {
        const getCats = async () => {
            const response = await axios.get(
                `${apiUrl}/category/get-all`
            );
            if (response.data.success) {

                setCategory(response.data.listCategory)
            }
        };

        const getCateName = async () => {
            const response = await getCateById(categoryId)
            if (response.success) {
                setCatName(response.category.name)
            }
        }

        const getPostCurrent = async () =>{
            const res = await getPostById(id)
            console.log(res)
            if (res.success) {
                setPost({
                    ...post, 
                    title: res.post.title,
                    categoryId: res.post.categoryId,
                    desc: res.post.desc,
                    photo: res.post.photo
                });
            }
        }
        if (categoryId) {
            getCateName();
        }
        getCats();
        getPostCurrent();
    }, [id]);

    const fileToBase64 = (file, cb) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(null, reader.result);
        };
        reader.onerror = function (error) {
            cb(error, null);
        };
    };
    const onUploadFileChange = ({ target }) => {
        if (target.files < 1 || !target.validity.valid) {
            return;
        }

        const file = target.files[0];
        fileToBase64(file, (err, result) => {
            if (result) {
                setPost({
                    ...post,
                    photo: file,
                });
            }
        });
        var preview = document.getElementById("review-post-img");
        var reader = new FileReader();
        reader.onloadend = function () {
            preview.src = reader.result;
        };
        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }

    };

    const onSubmitPost = async (event) => {
        event.preventDefault();
        try {
            const profileUpdate = await updatePost(post, id);
            if (profileUpdate.success) {
                success('Updated post successfully!')
            } else {
                error('Updated post fail!')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Row>
                <Col style={{ width: '60%' }}>
                    <div className="write block-wrete-left" style={{ witdh: '90%', paddingBottom: '100px' }}>
                        <form className="writeForm" onSubmit={onSubmitPost}>
                            <div className="writeFormGroup">
                                <label htmlFor="fileInput">
                                    <Image className="writeIcon" style={{ width: '30px', height: '30px' }} />
                                </label>
                                <input
                                    type="file"
                                    id="fileInput"
                                    style={{ display: "none" }}
                                    onChange={onUploadFileChange}
                                />
                                <label style={{ marginLeft: "20px", fontSize: "30px", fontWeight: "600" }}>Title</label>
                                <input
                                    type="text"
                                    placeholder=""
                                    className="writeInput titleInput"
                                    name="title"
                                    value={title}
                                    onChange={onChangePost}
                                />
                                <div style={{ width: "20vw" }}>
                                    <label style={{ fontSize: "30px", fontWeight: "600" }}>Category</label>
                                    <select
                                        className="select-form-search"
                                        style={{ height: '30px', borderRadius: '5px', marginTop: '5px' }}
                                        name="city"
                                        onChange={onChangeSelectCate}
                                    >
                                        <option key={""} value="" defaultChecked>
                                            Select Category
                                        </option>
                                        {cats.map((category) => (
                                            <option key={category._id} value={category._id}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="writeFormGroup" /* style={{width: '116%'}} */>
                                <textarea
                                    placeholder="Tell us your story..."
                                    type="text"
                                    className="writeInput writeText"
                                    name="desc"
                                    value={desc}
                                    onChange={onChangePost}
                                /* onChange={e => setDescription(e.target.value)} */
                                ></textarea>
                            </div>
                            <button className="writeSubmit" style={{ float: 'right' }} type="submit" onClick={() => { !photo && alert("Missing image") }}>
                                Save
                            </button>
                        </form>
                    </div>
                </Col>
                <Col>
                    <div className="singlePost">
                        <div className="singlePost-review">
                            <img id='review-post-img' src={photo ? photo : ImgEx} alt="" className="singlePostImg" />
                            <h1 className="singlePostTitle">
                                {title}
                                {/* {post.userId._id === user?._id &&
                    (<div className="singlePostEdit">
                      {<Edit className="singlePostIcon" onClick={() => setUpdateMode(true)} />
                    <Delete className="singlePostIcon" onClick={handleDelete} />}
                    </div>)} */}
                            </h1>
                            <div className="singlePostInfo">
                                <span className="singlePostAuthor">
                                    Author:{" "}
                                    <Link to={`/user/${user._id}`} className="link">
                                        <b>{user.fullname}</b>
                                    </Link>
                                </span>
                                <span className="singlePostCats">
                                    Category: {catName}
                                    {/* <Link to={`/?cat=${c.name}`} className="link" key={c._id}>
            <span className="postCat">{c.name}</span>
          </Link> */}
                                    <span className="singlePostCats">{post.title}</span>
                                </span>

                                <span className="singlePostDate">
                                    {new Date().toDateString()}
                                </span>
                            </div>
                            <p className="singlePostDesc">{desc}</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
}
export default UpdatePost