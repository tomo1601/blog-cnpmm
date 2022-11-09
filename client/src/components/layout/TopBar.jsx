import { Link } from "react-router-dom";
import "./topbar.css";
import { Search} from '@mui/icons-material';
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AuthenticationService from "../../services/AuthenticationService";

export default function Topbar() {
  const {user, dispatch} = useContext(AuthContext);
  const handleLogout = async () => {
    await AuthenticationService.logout()
    dispatch({type: 'LOGOUT'})
  };
  return (
    <div className="top">
      <div className="topLeft">
        <div className="topLeftTitle">
            <Link className="link" to="/">
              Life Stories
            </Link>
        </div>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/about">
              ABOUT
            </Link>
          </li>
          {/* <li className="topListItem">
            <Link className="link" to="/contact">
              CONTACT
            </Link>
          </li> */}
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src={user.photoUrl}
              alt=""
            />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <Link className="link" to="/search">
          <Search className="topSearchIcon"/>
        </Link>
      </div>
    </div>
  );
}