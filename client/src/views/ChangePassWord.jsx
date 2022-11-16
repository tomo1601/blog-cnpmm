import { PhotoCamera, Edit } from "@mui/icons-material";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useToast } from '../contexts/Toast';

const Settings = () => {

    const { authState: { user }, changePassWord, mailAuth } = useContext(AuthContext);
    const { error, success } = useToast();
    const [newpPassword, setnewpPassword] = useState({
        _id: user._id,
        username: user ? user.username : '',
        currentPassword: '',
        newPassword: '',
    });

    const [userEmail, setUserEmail] =useState({
        email:user.email
    })
    const { username, currentPassword, newPassword } = newpPassword

    const onChangePassword = (event) =>
        setnewpPassword({
            ...newpPassword, [event.target.name]: event.target.value,
        });

    const [otpState, setOtpState] = useState(false)

    const [otp, setOtp] = useState('')
    const [OtpResponse, setOtpResponse] = useState('')

    const onChangeOtp = event => setOtp(event.target.value)
    
    const getOtpChangePassword = async (event) => {
        event.preventDefault()
        const res = await mailAuth(userEmail)
        if (res.success) {
            setOtpResponse(res.otp)
            setOtpState(true)
        }
        else {
            error('Sent OTP code fail!')
        }
    }

    const onSubmitUpdateProfile = async (event) => {
        event.preventDefault();
        if (OtpResponse === otp) {
            try {
                const updatePass = await changePassWord(newpPassword);
                console.log(updatePass)
                if (updatePass.success) {
                    success('Updated password successfully!')
                } else {
                    error('Updated password fail!')
                }
            } catch (error) {
                console.log(error);
            }
        }
        else error('OTP code unvalid!')
    };

    let btnClick
    if (otpState) {
        btnClick = (
            <>
                <label>OTP</label>
                <input
                    type="text"
                    name='otp'
                    value={otp}
                    onChange={onChangeOtp}
                />
                <div className="settingButton">
                    <button className="settingsSubmit" onClick={getOtpChangePassword}>
                        Resend OTP
                    </button>
                    <button className="settingsSubmit" type="submit" /* onClick={updateFunc} */>
                        Update
                    </button>
                </div>
            </>
        )
    }
    else {
        btnClick = (
            <div className="settingButton">
                <button className="settingsSubmit" onClick={getOtpChangePassword} /* onClick={updateFunc} */>
                    Update
                </button>
            </div>
        )
    }

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

                    </div>
                    <span className="title" style={{ cursor: "pointer" }} >
                        <span>{username}</span>
                    </span>
                    <label>Current password</label>
                    <input
                        type="password"
                        name='currentPassword'
                        value={currentPassword}
                        onChange={onChangePassword}
                    />
                    <label>New password</label>
                    <input
                        type="password"
                        name='newPassword'
                        value={newPassword}
                        onChange={onChangePassword}
                    />
                    {btnClick}
                </form>
            </div>
        </div>
    );
}

export default Settings