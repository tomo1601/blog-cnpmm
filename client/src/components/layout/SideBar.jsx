import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import aboutImg from '../../assets/73423_about_her_stop_thinking_icon.png'
import axios from "axios";
import { apiUrl } from "../../contexts/constants";

export default function Sidebar() {
  const [cats, setCats] = useState([]);
  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get(`${apiUrl}/category/get-all`)
      if (res.data.success){
        setCats(res.data.listCategory);
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
      <div className="sidebarItem" style={{width: '80%'}}>
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList" style={{paddingLeft: '0px', textAlign: 'center', width: '60%'}}>
          {cats.map((c, _id) => (
            
            <Link to={`/post?categoryId=${c._id}`} className="link" key={c._id}>
              <li className="sidebarListItem">{c.name}</li>
              <br/>
            </Link>
          ))}
        </ul>
      </div>
      
    </div>
  );
}