import PostsInSearch from '../components/layout/PostsInSearch';
import { useState, useEffect, useContext } from "react"
import { List, ListItemButton, ListItemText } from '@mui/material'
import Topbar from '../components/layout/TopBar';
import Footer from '../components/layout/Footer';
import { PostContext } from '../contexts/PostContext';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SrcIcon from '../assets/search-icon.png'
import axios from 'axios';
import { apiUrl } from '../contexts/constants';

export default function SearchFilter() {

    const { getAllPosts, getPostByCateId, searchByKeyWord } = useContext(PostContext);

    const [cats, setCats] = useState([]);
    const [posts, setPosts] = useState([]);
    const [postsPath, setPostsPath] = useState([]);
    const [query, setQuery] = useState("");
    const [notFoundPost, setNotFoundPost] = useState(false)

    const hanldeSearch = async (event) => {
        const res = await searchByKeyWord(query)
        if (res.success) {
            if (res.data.length > posts.length) {
                const p = res.data.splice(posts.length + 1, res.data.length - posts.length)
                p.map((pst, _id) => 
                    pst.categoryId = pst.categoryId._id
                )
                setPostsPath(p)
                isFoundPost(p.length)
            }
            else {
                setPostsPath(res.data)
                isFoundPost(res.data.length)
            }
            
        }
        else isFoundPost(0)
    }

    const isFoundPost = (num) => {
        if (num !== 0) {
            setNotFoundPost(false)
        }
        else setNotFoundPost(true)
    }

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await getAllPosts()
            setPosts(res.listPost)
            setPostsPath(res.listPost)
        };
        const getCats = async () => {
            const res = await axios.get(`${apiUrl}/category/get-all`)
            if (res.data.success) {
                setCats(res.data.listCategory);
            }
        };

        getCats()
        fetchPosts()
    }, []);

    const onClickCategory = async (cateId, cateName) => {
        const res = await getPostByCateId(cateId)
        if (res.success) {
            setPostsPath(res.post)
            document.getElementById('chose_category_title').innerText = cateName
            isFoundPost(res.post.length)
        }

    }


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
                                 />
                            <img src={SrcIcon} alt='' className='img-search' onClick={(e) => hanldeSearch(e)} />
                        </div>
                        <div className='under_search'>
                            <ul>
                                {cats.map((c, _id) => (
                                    <li key={_id} className='list_cate_under_search'
                                        onClick={(event) => onClickCategory(c._id, c.name)} >
                                        {c.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div style={{ display: notFoundPost ? 'block' : 'none' }} className='p_notfound'>
                            No Have Post in this Category yet!
                        </div>
                    </Col>
                    <Col >
                        <div style={{ display: 'flex' }} className='cateBox'>
                            <List sx={{ width: '100%', maxWidth: 400, bgcolor: "background.paper", mx: "auto" }}>
                                {cats.map((c, _id) => (
                                    <ListItemButton key={_id} sx={{ bgcolor: "#E7EBF0" }}
                                        style={{ padding: '0px 16px' }}
                                        onClick={(event) => onClickCategory(c._id, c.name)}>
                                        <ListItemText primary={c.name} secondary={c.description} />
                                    </ListItemButton>
                                ))}
                            </List>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="results">
                <div id='chose_category_title' className='chose_category_title'>Post</div>
                <PostsInSearch posts={postsPath} />
            </div>
            <Footer />
        </>
    )
}
