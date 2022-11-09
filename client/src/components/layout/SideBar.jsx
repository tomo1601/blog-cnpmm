import { Link } from "react-router-dom";
import { Facebook, Instagram, Pinterest, Twitter } from '@mui/icons-material';
import { useEffect, useState } from "react";


export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      /* const res = await CategoryService.getAll() */
      /* setCats(res.data.data); */

    };
    getCats();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
          alt=""
        />
        <p>
          Created by Us
        </p>
        <p>
          <Link className="link" to="/about">
            Click here for more information
          </Link>
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/?categoryId=${c._id}`} className="link" key={c._id}>
              <li className="sidebarListItem">{c.title}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <Facebook className="sidebarIcon" />
          <Instagram className="sidebarIcon" />
          <Pinterest className="sidebarIcon" />
          <Twitter className="sidebarIcon" />
        </div>
      </div>
    </div>
  );
}