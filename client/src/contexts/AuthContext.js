import { createContext, useReducer, useEffect, useState } from "react";
import axios from "axios";
import { AuthReducer } from "../reducers/AuthReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME, USER_ROLE } from "./constants";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(AuthReducer, {
    authLoading: false,
    isAuthenticated: false,
    user: null,
    isUser: false,
    isAdmin: false,
  });

  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  /* const loginAdmin = async (adminForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, adminForm);
      if (response.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.token);
        localStorage.setItem(USER_ROLE, "admin");
        await loadUser("admin");
      }
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  }; */
  // Login user
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.token);
        localStorage.setItem(USER_ROLE, "user");
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: response.data,
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
        localStorage.setItem(USER_ROLE, "user");
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: response.data,
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
  const authContextData = {
    loginUser, registerUser, loginAdmin, logout,getUserById, authState,

  };

  //return
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
