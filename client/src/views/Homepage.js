import Header from "../components/layout/Header";
import Posts from "../components/layout/Posts";
import Sidebar from "../components/layout/SideBar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";

export default function Homepage() {
  const [posts,setPosts] = useState([]);
  const {search} = useLocation();
  const obj = {};
  if(search) {
    const arr = search.split('?')[1].split('=')
  
    obj[arr[0]] =arr[1];
  }
  
  useEffect(() => {
    const fetchPosts = async () => {
      /* const res = await PostService.getAll('public',{ page: 1, ...obj});
      console.log(res.data.data)
      setPosts(res.data.data); */
    };
    fetchPosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}