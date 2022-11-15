import { Link } from "react-router-dom";
import { Search} from '@mui/icons-material';
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Topbar() {
  const {authState: {user, isAuthenticated}, logout} = useContext(AuthContext);
  const handleLogout = async () => {
    await logout()
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
          <li style={{ display: `${isAuthenticated ? 'block' : 'none'}` }} className="topListItem" onClick={handleLogout}>
            LOGOUT
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/profile">
            <img
              className="topImg"
              src={user.avatar}
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