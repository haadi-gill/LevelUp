import React from 'react'
import { Link } from 'react-router-dom';
import './Login.css'
import {FaUserNinja, FaLock} from "react-icons/fa";
import logo from '../Assets/LevelUpLogoSlogan.png'

const Login = () => {
    return (
        <div>
            <img src={logo} alt="Logo" className="logo" style={{ width: '30%', height: 'auto' }} />
            <div className='wrapper'>
                <form action="">
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Username' required />
                        <FaUserNinja className = 'icon'/>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required/>
                        <FaLock className = 'icon' />
                    </div>
                    
                    <div className="remember-forgot">
                        <label><input type="checkbox" />Remember me</label>
                        <a href="#">Lost Password?</a>
                    </div>
                    <button type="submit">Login</button>
                    <div className="register-link">
                       <p>Don't have a LevelUp account? <Link to="/Register">Join Us</Link></p> 
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
