import {FaUserNinja, FaLock} from "react-icons/fa";
import logo from '../Assets/LevelUpLogo.png'
import { Link } from "react-router-dom";
import { LoginCredentials } from '../../network/users_api';
import { useForm } from 'react-hook-form';
import { Navigate } from "react-router-dom";
import { useState } from 'react';
import * as UsersApi from '../../network/users_api';
import './Login.css'

const Login = () => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [UserId, setUserId] = useState<string>("");

    async function onSubmit(credentials: LoginCredentials) {
        try {
            const response = await UsersApi.login(credentials);
            setUserId(response.user._id);
            setIsLoggedIn(true);
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
                console.error(error.message);
            }
            else {
                console.error("An unexpected error occurred.");
            }
        }
    }

    if (isLoggedIn) {
        return <Navigate to={`/HomePage/${UserId}`}/>;
    }

    return (

        <div className="login-container">
            <img src={logo} alt="Logo" className="logo" style={{ width: '35%', height: 'auto' }} />
            <div className='wrapper'>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Username' {...register('username', {required: true})} />
                        <FaUserNinja className = 'icon'/>
                    </div>
                    {errors.username && <p className="error">Username is required</p>}
                    <div className="input-box">
                        <input type="password" placeholder="Password" {...register('passwordRaw', {required: true})}/>
                        <FaLock className = 'icon' />
                    </div>
                    {errors.passwordRaw && <p className="error">Password is required</p>}
                                        
                    <div className="remember-forgot">
                        <label><input type="checkbox" />Remember me</label>
                        <a href="/ForgotPassword">Lost Password?</a>
                    </div>
                    <button type="submit" disabled={isSubmitting}>Login</button>
                    <div className="register-link">
                       <p>Don't have a LevelUp account? <Link to="/Register">Join Us</Link></p> 
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login