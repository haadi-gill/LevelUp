import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { RegisterCredentials } from '../../network/users_api';
import './Register.css'
import {FaUserNinja, FaLock, FaUnlock} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import * as UsersApi from '../../network/users_api';
import logo from '../Assets/LevelUpLogo.png'

const Register = () => {

    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm<RegisterCredentials>();

    async function onSubmit(credentials: RegisterCredentials) {
        try {
            const user = await UsersApi.register(credentials); // will call the register function from users_api.ts
            console.log(user);
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

    return (
        <div>
            <img src={logo} alt="Logo" className="logo" style={{ width: '35%', height: 'auto' }} />
            <div className='wrapper'>
                <form onSubmit={handleSubmit(onSubmit)} action="">
                    <h1>Register</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Email' {...register('email', {required: true})}/>
                        <MdEmail className = 'icon'/>
                    </div>
                    {errors.email && <p className="error">Email is required</p>}
                    <div className="input-box">
                        <input type="text" placeholder='Username' {...register('username', {required: true})} />
                        <FaUserNinja className = 'icon'/>
                    </div>
                    {errors.username && <p className="error">Username is required</p>}
                    <div className="input-box">
                        <input type="password" placeholder="Password" {...register('passwordRaw', {required: true})}/> 
                        <FaUnlock className = 'icon' />
                    </div>
                    {errors.passwordRaw && <p className="error">Password is required</p>}
                    <button type="submit" disabled={!isValid || isSubmitting}>Register</button>
                    <div className="register-link">
                       <p>Already have a LevelUp account? <Link to="/Login">Login</Link></p> 
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register