import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'


const Auth = ({authRoute}) =>{

    let body
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