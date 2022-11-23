import { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import { PostReducer } from "../reducers/PostReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {

    const [postState, dispatch] = useReducer(PostReducer, {
        posts: [],
        postLoading: true
    });

    const [showToast, setShowToast] = useState({
        show: false,
        message: "",
        type: null,
    });


    // Login user
    const getAllPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/post/get-all`);
            if (response.data.success) {
                dispatch({
                    type: "SET_POST",
                    payload: {
                        posts: response.data.listPost
                    },
                });
            }
            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    };

    const getPostById = async (id) => {
        const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME]
        try {
            const response = await axios.get(`${apiUrl}/post/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${recentToken}`,
                },
            });
            if (response.data.success) {
                dispatch({
                    type: "FIND_POSTS_SUCCESS",
                    payload: response.data.post
                });
                return response.data;
            }

        } catch (error) {
            dispatch({
                type: "FIND_POSTS_FAIL"
            });
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }

    // get post by user ID
    const getPostByUserId = async (id) => {
        try {
            const response = await axios.get(`${apiUrl}/post/?userId=${id}`);
            if (response.data.success) {
                return response.data;
            }
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }

    // new Post
    const createPost = async (post) => {
        const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME]
        try {
            const response = await axios.post(`${apiUrl}/post/newpost`, post, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${recentToken}`,
                },
            });
            if (response.data.success) {
                return response.data;
            }

        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }

    // update Post
    const updatePost = async (post, id) => {
        const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME]
        try {
            const response = await axios.put(`${apiUrl}/post/${id}`, post, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${recentToken}`,
                },
            });
            if (response.data.success) {
                return response.data;
            }

        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }

    // delete Post
    const deletePost = async (post) => {
        const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME]
        try {
            const response = await axios.delete(`${apiUrl}/post/delete-post`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${recentToken}`,
                },
                data: post
            });
            console.log(response)
            if (response.data.success) {
                return response.data;
            }

        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }
    //get post by category
    const getPostByCateId = async (id) => {
        try {
            const response = await axios.get(`${apiUrl}/post/?categoryId=${id}`);
            if (response.data.success) {
                return response.data;
            }
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }

    // like/ dislike
    const likePost = async (post) => {
        const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME]

        try {
            const response = await axios.post(`${apiUrl}/feeling/createFeeling`,post, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${recentToken}`,
                },
                
            });
            if (response.data.success) {
                return response.data;
            }
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }

    // checkfeeling
    const checkFeeling = async (id) => {
        const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME]

        try {
            const response = await axios.get(`${apiUrl}/feeling/checkfeeling/?postId=${id}`,
            {
                headers: {
                    'Accept': 'application/json',
                    Authorization: `Bearer ${recentToken}`,
                },  
            })
            /* axios.get(`${apiUrl}/feeling/checkfeeling`, postId, headers); */
            if (response.data.success) {
                return response.data;
            }
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return { success: false, message: error.message };
        }
    }
    // export
    const authContextData = {
        getAllPosts, getPostById, getPostByUserId, createPost, updatePost,
        deletePost, getPostByCateId, likePost, checkFeeling,
    };

    //return
    return (
        <PostContext.Provider value={authContextData}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
