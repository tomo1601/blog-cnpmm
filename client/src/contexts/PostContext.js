import { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import { PostReducer } from "../reducers/PostReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME, USER_ROLE } from "./constants";

export const PostContext = createContext();

const PostContextProvider = ({ children }) => {

  const [postState, dispatch] = useReducer(PostReducer, {
    posts:[],
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
  
  const authContextData = {
    getAllPosts,
  };

  //return
  return (
    <PostContext.Provider value={authContextData}>
      {children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
