import AdminLoginForm from '../components/auth/AdminLoginForm'
import Spiner from 'react-bootstrap/Spinner'
import { Redirect } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'


const AuthAdmin = ({ authRoute }) => {

    const { authState: { authLoading, isAuthenticated, isAdmin } } = useContext(AuthContext)

    const redirect = () => {
        window.location.href = 'http://localhost:3006';
        // maybe can add spinner while loading
        return null;
    }

    let body

    if (authLoading)
        body = (
            <div className='d-flex justify-content-center mt-2'>
                <Spiner animation='border' variant='info' />
            </div>
        )
    else if (isAuthenticated && isAdmin)
        redirect()
    else
        body = (
            <>

                {authRoute === 'admin' && <AdminLoginForm />}


            </>
        )


    return (
        <div>
            {body}
        </div>
    )
}

export default AuthAdmin