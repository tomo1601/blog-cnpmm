import { createContext, useReducer } from "react";
import axios from "axios";
import { AuthReducer } from "../reducers/AuthReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME, USER_ROLE } from "./constants";
import { useEffect } from "react"

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(AuthReducer, {
    authLoading: false,
    isAuthenticated: false,
    user: null,
    isUser: false,
    isAdmin: false,
  });

  // auth user
  const loadUser = async () => {
    try {
      const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME];
      if (recentToken !== undefined) {
        const response = await axios.get(`${apiUrl}/auth/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${recentToken}`,
          },
        });

        if (response.data.success) {
          dispatch({
            type: "SET_AUTH",
            payload: {
              isAuthenticated: true,
              user: response.data.user,
              isUser: response.data.user.role ==='User'?true: false,
              isAdmin: response.data.user.role ==='Admin'?true: false,
            },

          });
        } else throw new Error("Unauthorized !");
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      localStorage.removeItem(USER_ROLE);
      dispatch({
        type: "SET_AUTH",
        payload: {
          isAuthenticated: false,
          user: null,
          isUser: false,
          isAdmin: false,
        },
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);
  // Login user
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.token);
        localStorage.setItem(USER_ROLE, response.data.info.role);
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: response.data.info,
            isUser: true,
            isAdmin: false,
          },
        });
      }

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  // admin login
  const loginAdmin = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.token);
        localStorage.setItem(USER_ROLE, response.data.info.role);
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: response.data.info,
            isUser: false,
            isAdmin: true,
          },
        });
      }

      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const getUserById = async (id) => {
    try {
      const response = await axios.post(`${apiUrl}/user/${id}`);
      if (response.data.success)
        return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  }
  // logout
  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
    localStorage.removeItem(USER_ROLE)
    dispatch({
      type: "SET_AUTH",
      payload: {
        isAuthenticated: false,
        user: null,
        isUser: false,
        isAdmin: false,
      },
    });
  }
  // Register user
  const registerUser = async (registerForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, registerForm);
      if (response.data.success)
        return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // authMail
  const mailAuth = async (email) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/sendmailotp`, email);
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  //update profile
  const updatePofile = async (profile) => {
    try {

      const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME];
      const response = await axios.put(`${apiUrl}/user/changeProfile/${profile._id}`, profile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${recentToken}`
          },
        });
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: response.data,
            isUser: true,
            isAdmin: false,
          },
        });
        return response.data;
      }
    }
    catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  }

  // change password
  const changePassWord = async (pass) => {
    try {

      const recentToken = localStorage[LOCAL_STORAGE_TOKEN_NAME];
      const response = await axios.put(`${apiUrl}/user/update-password/${pass._id}`, pass,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${recentToken}`
          },
        });
      if (response.data.success) 
        return response.data
    }
    catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  }
  // getCate by id
  const getCateById = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/category/${id}`);
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };


  const authContextData = {
    loginUser, registerUser, loginAdmin, logout, getUserById, authState,
    mailAuth, updatePofile, changePassWord, getCateById,

  };

  //return
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
