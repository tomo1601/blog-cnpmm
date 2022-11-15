import { PhotoCamera, Edit } from "@mui/icons-material";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useToast } from '../contexts/Toast';

const Settings = () => {

  const { authState: { user }, updatePofile } = useContext(AuthContext);
  const { error, success } = useToast();
  const [userInfo, setUserInfo] = useState({
    _id: user._id,
    email: user.email,
    username: user ? user.username : '',
    fullname: user ? user.fullname : '',
    avatar: '',
  });

  const { email, username, fullname, avatar } = userInfo

  const onChangeUserInfo = (event) =>
    setUserInfo({
      ...userInfo, [event.target.name]: event.target.value,
    });

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
        setUserInfo({
          ...userInfo,
          avatar: file,
        });
      }
    });
    var preview = document.getElementById("avt-review");
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
  const onSubmitUpdateProfile = async (event) => {
    event.preventDefault();
    try {
      const profileUpdate = await updatePofile( userInfo);
      if (profileUpdate.success) {
        success('Updated infomation successfully!')
      } else {
        error('Updated infomation fail!')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <form className="settingsForm" onSubmit={onSubmitUpdateProfile}>
          <span className="title">Profile Picture</span>
          <div className="settingsPP">
            <img
              id="avt-review"
              src={user.avatar}
              alt=""
            />
            <label htmlFor="fileInput">
              <div className="settingsPPIcon">
                <PhotoCamera style={{ color: "black" }} />{" "}
              </div>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={onUploadFileChange}
            />
          </div>
          <span className="title" style={{ cursor: "pointer" }} >
            <Edit className="singlePostIcon" />{" "}
            <span>Sửa hồ sơ</span>
          </span>
          <label>Full Name</label>
          <input
            type="text"
            name='fullname'
            value={fullname}
            onChange={onChangeUserInfo}
          />
          <label>Username</label>
          <input
            type="text"
            name='username'
            defaultValue={user.username}
            disabled={true}
          />
          <label>Email</label>
          <input
            type="email"
            name='email'
            defaultValue={user.email}
            disabled={true}
          />
          <div className="settingButton">
            <button className="settingsSubmit" type="submit" /* onClick={updateFunc} */>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings