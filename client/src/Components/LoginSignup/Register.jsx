import React from 'react'
import { Link } from 'react-router-dom';
import './Register.css'
import {FaUserNinja, FaLock} from "react-icons/fa";
import logo from '../Assets/LevelUpLogoSlogan.png'

const Register = () => {
    return (
        <div>
            <img src={logo} alt="Logo" className="logo" style={{ width: '30%', height: 'auto' }} />
            <div className='wrapper'>
                <form action="">
                    <h1>Register</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Username' required />
                        <FaUserNinja className = 'icon'/>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required/>
                        <FaLock className = 'icon' />
                    </div>

                    <div className="input-box">
                        <input type="password" placeholder="Confirm Password" required/>
                        <FaLock className = 'icon' />
                    </div>
                    
                    <div className="remember-forgot">
                        <label><input type="checkbox" />Remember me</label>
                        <a href="#">Lost Password?</a>
                    </div>
                    <button type="submit">Register</button>
                    <div className="register-link">
                       <p>Already have a LevelUp account? <Link to="/Login">Login</Link></p> 
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register