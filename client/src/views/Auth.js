import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import Spiner from 'react-bootstrap/Spinner'
import { Redirect } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'


const Auth = ({authRoute}) =>{

    const {authState: {authLoading, isAuthenticated, isUser}} = useContext(AuthContext)

    let body

    if (authLoading)
    body = (
        <div className='d-flex justify-content-center mt-2'>
            <Spiner animation = 'border' variant = 'info'/>
        </div>
    )
    else if(isAuthenticated) 
        return <Redirect to ='/homepage'/>
    else  
    body = (
        <>
            
            {authRoute==='login' && <LoginForm/>}
            {authRoute==='register' && <RegisterForm/>}
           
        
        </>
    )


    return (
       <div>
        {body}
       </div>
    )
}

export default Auth