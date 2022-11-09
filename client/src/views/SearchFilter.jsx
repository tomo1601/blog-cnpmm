import "./search.css";
import Posts from "../../components/posts/Posts";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import {List, ListItemButton, ListItemText, ListItemAvatar, Avatar} from '@mui/material'
import SearchService from "../../services/SearchService"
import PostService from "../../services/PostService";

export default function SearchFilter() {

    const [posts, setPosts] = useState([]);
    const [postsPath, setPostsPath] = useState([]);
    const [query, setQuery] = useState("");
    const {search} = useLocation();
    const history = useHistory();
    const hanldeSearch = (event) => {
        if(event.key === 'Enter') {
            history.push(`?q=${query}`);

        }
    }     
    useEffect(() => {
        const fetchPosts = async () => {             
            const res = await SearchService.search(1, {text: query});
            setPosts(res.data.data.filter(item => item.title))
        };
        if(query.length > 2) {
            fetchPosts();
        } else {
            setPosts([]);
        }
    },[query]);
    
    useEffect(() => {
        const fetchPostPath = async () => {
            const res = await SearchService.search(1, {text: search.split("=")[1]});
            setPosts([]);
            let postPath = res.data.data.filter(item => item.title);
            let users = []; 
            res.data.data.filter(item => item.userName).map(item => users.push(item._id));
            const temp = await PostService.getAll('public', {page: 1});
            let p = temp.data.data.filter(item => users.some((user) => item.userId._id === user))
            setPostsPath(postPath.concat(p).filter((v,i,a)=>a.findIndex(v2=>(v2._id===v._id))===i))
        }
        if(search!=="") {
            fetchPostPath();
        } 
        if(postsPath!==[] && search==="" ){
            setPostsPath([]);
            //history.go(0);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[search])
    // console.log( path==="");
    // console.log(postPath!==[] && path==="");
    return (
        <>
            <div className="search">
                <div style={{display:"flex", flexDirection:"column"}}>
                    <div className="searchBox">
                        <input type="search" id="search" className="searchInput" placeholder="Search..." onChange={(e)=>setQuery(e.target.value)} onKeyPress={(e)=>hanldeSearch(e)}/>
                    </div>     
                    <div>
                        <List sx={{ width: '100%', maxWidth: 400, bgcolor: "background.paper", mx:"auto" }}>
                            {posts!=null && posts.map((p, _id) =>(                      
                                <ListItemButton key={_id} sx={{bgcolor: "#E7EBF0"}}>
                                    <ListItemAvatar>
                                        <Avatar>{p.thumbnailUrl}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={p.title} secondary={p.userId.userName} />
                                </ListItemButton>
                            ))}
                        </List>  
                    </div>
                    
                </div>  
            </div>
            <div className="results">
                <Posts posts={postsPath}/>   
            </div>         
        </>
    )
}
