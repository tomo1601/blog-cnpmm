import { useState, useEffect } from "react";
import "./write.css";
import {Image} from "@mui/icons-material";
import {Button, Menu, MenuItem} from '@mui/material';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../firebase";
import PostService from "../../services/PostService";
import CategoryService from "../../services/CategoryService";

toast.configure();

export default function Write() {
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [file, setFile] = useState(null);
  const [cats, setCats] = useState([]);
  const [cat, setCat] = useState("Choose Category")
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  }

  const openMenu = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleCategory = (c) => {
    setCat(c.title);
    setCategoryId(c._id);
    handleClose();
  }

  useEffect(()=>{
    const getCats = async ()=> {
      const res = await CategoryService.getAll()
      setCats(res.data.data);
      
    };
    getCats();
  },[]);

  const writeFunc = async (e, id) => {
    const res = await PostService.uploadPost(e);
    window.location.replace("/post/" + res.data.data._id);
    res ? toast.update(id, { render: "All is good", type: "success", isLoading: false, autoClose: true }) 
      : toast.update(id, { render: "Something went wrong", type: "error", isLoading: false, autoClose: true });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      title,
      description,
      categoryId
    };
    if (file) {
      const id = toast.loading("Please wait...")
      const fileName = new Date().getTime() + file.name;
      const imageRef = ref(storage, `post_thumbnail/${fileName}`);
      uploadBytes(imageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          newPost.thumbnailUrl = url;
          writeFunc(newPost, id);
        });
      });
      
    }
  };
  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <Image className="writeIcon"/>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <span style={{marginLeft:"20px", fontSize:"30px", fontWeight:"600" }}>Title</span>
          <input
            type="text"
            placeholder=""
            className="writeInput titleInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
          <div style={{width:"20vw"}}>
            <span style={{fontSize:"30px", fontWeight:"600" }}>Category</span>
            <Button style={{fontFamily:"Lora", textTransform:"none", color:"black", fontSize:"20px", fontWeight:"400"}} onClick={openMenu}>{cat}</Button>
            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
              {cats.map((c)=>(
              <MenuItem key={c._id} onClick={()=>handleCategory(c)}>
                {c.title}
              </MenuItem>
              ))}
            </Menu>
          </div>
          <button className="writeSubmit" type="submit"  onClick={()=>{!file && alert("Missing image")}}>
            Publish
          </button>
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell us your story..."
            type="text"
            className="writeInput writeText"
            onChange={e=>setDescription(e.target.value)}
          ></textarea>
        </div>
      </form>
    </div>
  );
}