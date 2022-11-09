import "./settings.css";
import {PhotoCamera, Edit} from "@mui/icons-material";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../firebase";
import AuthenticationService from "../../services/AuthenticationService";

toast.configure();

export default function Settings() {
  const [file, setFile] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const { user, token, dispatch } = useContext(AuthContext);
 
  const updateFunc = async (e) =>{
    let success = false;
    const res = await AuthenticationService.updateUserDetails(e);
    if(res.data.success) {
      success = true;
      const user = await AuthenticationService.me(token);
      
      dispatch({type: 'GET_CURRENT_USER', payload: user.data.data})
    }
    return success;
  }
  const handleSubmit = async (e) => {
    const updatedUser = {
      userName: userName ? userName : user.userName,
      email: email ? email : user.email,
    };
    e.preventDefault();
    if (file) {
      const id = toast.loading("Please wait...")
      const fileName = new Date().getTime() + file.name;
      const imageRef = ref(storage, `user_photoUrl/${fileName}`);
      uploadBytes(imageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          updatedUser.photoUrl = url;
          const success = updateFunc(updatedUser)
          if(success) {
            toast.update(id, { render: "All is good", type: "success", isLoading: false, autoClose: true });
          } else {
            toast.update(id, { render: "Something went wrong", type: "error", isLoading: false, autoClose: true });
          }
          
        });
      });
    } else {
      updatedUser.photoUrl = user.photoUrl;
      const success = updateFunc(updatedUser)
      if(success) {
        toast.success("All is good");
      } else {
        toast.error("Something went wrong")
      }
      
    }
    setUpdateMode(false);
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <form className="settingsForm" onSubmit={handleSubmit}>
          <span className="title">Profile Picture</span>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : user.photoUrl}
              alt=""
            />
            <label htmlFor="fileInput">
              <div className="settingsPPIcon">
                <PhotoCamera style={{color: "black"}}/>{" "}
              </div>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <span className="title" style={{cursor: "pointer"}} onClick={() => setUpdateMode(true)}>
            <Edit className="singlePostIcon"/>{" "}
            <span>Sửa hồ sơ</span>
          </span>
          
          <label>Username</label>
          <input
            type="text"
            defaultValue={user.userName}
            disabled={!updateMode}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            defaultValue={user.email}
            disabled={!updateMode}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="settingButton">
            {updateMode && (
              <button className="settingsSubmit" type="submit">
                Update
              </button>
            )}
          </div>   
        </form>
      </div>
    </div>
  );
}