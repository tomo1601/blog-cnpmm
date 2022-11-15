import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import AlertMessage from '../layout/AlertMessage'


const UserLoginForm = () => {

    //context
    const { registerUser, mailAuth } = useContext(AuthContext)
    const [authloading, setAuthLoading] = useState(false);
    const [alert, setAlert] = useState(null)
    //local state
    const [RegisterForm, setRegisterForm] = useState({
        email: '',
        password: '',
        username: '',
        confirmpassword: ''
    })
    const { email, password, username, confirmpassword } = RegisterForm
    const onChangeRegisterForm = event => setRegisterForm({
        ...RegisterForm, [event.target.name]: event.target.value
    })

    const [otpState, setOtpState] = useState(false)

    const [Otp, setOtp] = useState('')
    const [OtpResponse, setOtpResponse] = useState('')

    const {OtpRes} = Otp
    const onChangeOtp = event => setOtp(event.target.value)

    const onClickRegister = async event => {
        event.preventDefault()
        const res = await mailAuth(RegisterForm)
        if(res.success){
            setOtpResponse(res.otp)
            setOtpState(true)
        }
        else {
            setAlert({ type: 'danger', message: 'Sent OTP code fail!' })
            setTimeout(() => setAlert(null), 5000)
        }
    }

    let acceptOtp
    if (!otpState) acceptOtp = (
        <>
            <Button className='mt-2' variant='primary' onClick={onClickRegister}>Register</Button>
        </>
    )
    else acceptOtp = (
        <>
            <Form.Group>
                <Form.Label>OTP</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='use otp code was send into your email!'
                    name='otp'
                    value={OtpRes}
                    required
                    onChange={onChangeOtp}
                />
            </Form.Group>
            <Button disabled={authloading} className='mt-2' variant='primary' type='submit'>Register</Button>
        </>
    )


    const userRegister = async event => {
        event.preventDefault()
        if (confirmpassword !== password) {
            setAlert({ type: 'danger', message: 'You must re-enter the correct confirmation password' })
            setTimeout(() => setAlert(null), 5000)
        }
        else if(OtpResponse !== Otp){
            setAlert({ type: 'danger', message: 'OTP code invalid' })
            setTimeout(() => setAlert(null), 5000)
        }
        else {
            try {
                const userResgisterData = await registerUser(RegisterForm)
                if (userResgisterData.success) {
                    setAuthLoading(true);
                    setAlert({ type: 'success', message: 'Account created successfully!' })
                    setTimeout(() => setAlert(null), 5000)
                }
                else {
                    setAlert({ type: 'danger', message: userResgisterData.message })
                    setTimeout(() => setAlert(null), 5000)
                }
            }
            catch (error) {
                console.log(error)
            }
        }
    }
    let body

    body = (
        <>
            <div className="grid login-grid main login-box">
                <div className='ute-title'>
                    <h3>Sign up to continue!</h3>
                    <div className='login-social'></div>
                    <span className='ute-login-sml-text'>Please enter your information</span>
                </div>
                <Form className='my-4' id='form-login' onSubmit={userRegister}>
                    <AlertMessage info={alert} />
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder=''
                            name='username'
                            value={username}
                            required
                            onChange={onChangeRegisterForm}

                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder=''
                            name='email'
                            value={email}
                            required
                            onChange={onChangeRegisterForm}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder=''
                            name='password'
                            value={password}
                            required
                            onChange={onChangeRegisterForm}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder=''
                            name='confirmpassword'
                            value={confirmpassword}
                            required
                            onChange={onChangeRegisterForm}
                        />
                    </Form.Group>
                    {acceptOtp}
                </Form>
                <p> Aready have an account?
                    <Link to='/login'>
                        login
                    </Link>
                </p>

            </div>
        </>
    )

    return (
        <>
            {/*Header,logo*/}
            <div class="utew-login-top-header">
                <div class="topLeft">
                    <div class="topLeftTitle">
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