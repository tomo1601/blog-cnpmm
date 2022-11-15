import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import AlertMessage from '../layout/AlertMessage'
import { AuthContext } from '../../contexts/AuthContext'

const UserLoginForm = () => {

    const { loginUser } = useContext(AuthContext);
    const [authloading, setAuthLoading] = useState(false);
    const [userLoginForm, setUserLoginForm] = useState({
        username: "",
        password: "",
    });

    const [alert, setAlert] = useState(null);

    const { username, password } = userLoginForm;
    const onChangeUserLoginForm = (event) =>
        setUserLoginForm({
            ...userLoginForm,
            [event.target.name]: event.target.value,
        });

    const userLogin = async (event) => {
        setAuthLoading(true);
        event.preventDefault();
        try {
            const userLoginData = await loginUser(userLoginForm);
            if (!userLoginData.success) {
                setAlert({ type: "danger", message: userLoginData.message });
                setTimeout(() => setAlert(null), 5000);
            }
        } catch (error) {
            console.log(error);
        }
        setAuthLoading(false);
    };

    let body

    body = (
        <>
            <div className="grid login-grid main login-box">
                <div className='ute-title'>
                    <h3>Sign in to continue!</h3>
                    <div className='login-social'></div>
                    <span className='ute-login-sml-text'>Please enter your email and password</span>
                </div>
                <Form className='my-4' id='form-login' onSubmit={userLogin}>
                    <AlertMessage info={alert} /> 
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder=""
                            name="username"
                            required
                            value={username}
                            onChange={onChangeUserLoginForm}

                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder=""
                            name="password"
                            required
                            value={password}
                            onChange={onChangeUserLoginForm}
                        />
                    </Form.Group>
                    <Button  disabled={authloading} className='mt-2' variant='primary' type='submit'>Login</Button>
                </Form>
                <p> Don't have an account?
                    <Link to='/register'>
                        Register
                    </Link>
                </p>

            </div>
        </>
    )

    return (
        <>
            {/*Header,logo*/}
            <div className="utew-login-top-header">
                <div className="topLeft">
                    <div className="topLeftTitle">
                        <Link className='homelink' to="/">Life Stories</Link>
                    </div>
                </div>
            </div>
            {/*Form login*/}
            {body}
        </>
    )
}
export default UserLoginForm