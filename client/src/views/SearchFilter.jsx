import PostsInSearch from '../components/layout/PostsInSearch';
import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { List, ListItemButton, ListItemText, ListItemAvatar, Avatar } from '@mui/material'
import Topbar from '../components/layout/TopBar';
import Footer from '../components/layout/Footer';
import { PostContext } from '../contexts/PostContext';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SrcIcon from '../assets/search-icon.png'
import axios from 'axios';
import { apiUrl } from '../contexts/constants';

export default function SearchFilter() {

    const { getAllPosts } = useContext(PostContext);

    const [cats, setCats] = useState([]);
    const [posts, setPosts] = useState([]);
    const [postsPath, setPostsPath] = useState([]);
    const [query, setQuery] = useState("");
    const { search } = useLocation();
    const history = useHistory();

    const hanldeSearch = (event) => {
        if (event.key === 'Enter') {
            history.push(`?q=${query}`);

        }
    }
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await getAllPosts()
            setPosts(res.listPost)
        };
        const getCats = async () => {
            const res = await axios.get(`${apiUrl}/category/get-all`)
            if (res.data.success) {
                setCats(res.data.listCategory);
            }
        };
        getCats();
        fetchPosts()
    }, []);

    useEffect(() => {
        const fetchPostPath = async () => {
            /* const res = await SearchService.search(1, {text: search.split("=")[1]});
            setPosts([]);
            let postPath = res.data.data.filter(item => item.title);
            let users = []; 
            res.data.data.filter(item => item.userName).map(item => users.push(item._id));
            const temp = await PostService.getAll('public', {page: 1});
            let p = temp.data.data.filter(item => users.some((user) => item.userId._id === user))
            setPostsPath(postPath.concat(p).filter((v,i,a)=>a.findIndex(v2=>(v2._id===v._id))===i)) */
        }
        if (search !== "") {
            fetchPostPath();
        }
        if (postsPath !== [] && search === "") {
            setPostsPath([]);
            //history.go(0);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])
    // console.log( path==="");
    // console.log(postPath!==[] && path==="");
    return (
        <>
            <Topbar />
            <div className="search">
                <Row>
                    <Col className='col-lg-8'>
                        <div className="searchBox">
                            <input
                                type="search"
                                id="search"
                                className="searchInput"
                                placeholder="Search..."
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={(e) => hanldeSearch(e)} />
                            <img src={SrcIcon} alt='' className='img-search' />
                        </div>
                    </Col>
                    <Col >
                        <div style={{ display: 'flex' }} className='cateBox'>
                            <List sx={{ width: '100%', maxWidth: 400, bgcolor: "background.paper", mx: "auto" }}>
                                {cats.map((c, _id) => (
                                    <ListItemButton key={_id} sx={{ bgcolor: "#E7EBF0" }}>
                                        {console.log(c)}
                                        <ListItemText primary={c.name} secondary={c.description} />
                                    </ListItemButton>
                                ))}
                            </List>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="results">
                <PostsInSearch posts={posts} />
            </div>
            <Footer />
        </>
    )
}
