import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import React from 'react'
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from 'react-bootstrap/Spinner'
import Footer from "../layout/Footer";
import Topbar from "../layout/TopBar";

const ProtectedRoute =({component: Component, ...rest}) => {

    const {authState: {authloading, isAuthenticated, isUser}} = useContext(AuthContext)

    if(authloading){
        return (
            <div className='spiner-container'>
                <Spinner animation = 'border' variant = 'info'/>
            </div>
        )
    }

    return (
        <Route {...rest}  render = {props => isAuthenticated && isUser? (
            <>
            <Topbar/>
            <Component {...rest} {...props}/>
            <Footer/>
            </>
            ):(<Redirect to={{
                pathname: '/login',
                state: { message: "You need login to use this function!" },
            }}/>) } />
    )
}

export default ProtectedRoute