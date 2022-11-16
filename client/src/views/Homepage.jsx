import Header from "../components/layout/Header";
import Posts from "../components/layout/Posts";
import Sidebar from "../components/layout/SideBar";
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router";
import { PostContext } from "../contexts/PostContext";
import Topbar from "../components/layout/TopBar";
import Footer from "../components/layout/Footer";

export default function Homepage() {

  const [posts,setPosts] = useState([]);
  const {search} = useLocation();
  const { getAllPosts } = useContext(PostContext);

  const obj = {};
  if(search) {
    const arr = search.split('?')[1].split('=')
  
    obj[arr[0]] =arr[1];
  }
  

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await getAllPosts();
      setPosts(res.listPost);
    };
    fetchPosts();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  return (
    <>
      <Topbar/>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
      <Footer/>
    </>
  );
}