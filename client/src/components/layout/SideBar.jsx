import { Link } from "react-router-dom";
import { Facebook, Instagram, Pinterest, Twitter } from '@mui/icons-material';
import { useEffect, useState } from "react";
import aboutImg from '../../assets/73423_about_her_stop_thinking_icon.png'
import axios from "axios";
import { apiUrl } from "../../contexts/constants";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get(`${apiUrl}/category/get-all`)
      console.log(res)
      if (res.data.success){
        setCats(res.data.data);
      }
    };
    getCats();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src={aboutImg}
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