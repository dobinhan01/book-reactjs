import './AdminLogin.scss';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, loginAmin } from '../../../redux/actions/authAction';

const AdminLogin = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const { isLoggedIn, currentUser } = useSelector(state => state.auth);

    useEffect(() => {
        if (currentUser) {
            navigate('/admin')
        }
    }, [currentUser, navigate])

    useEffect(() => {
        setTimeout(() => {
            dispatch(getCurrentUser())
        }, 100)
    }, [dispatch, isLoggedIn])

    const handleLogin = () => {
        dispatch(loginAmin(email, password));
    }

    const handlePressEnter = async (event) => {
        if (event?.key === 'Enter') {
            await handleLogin();
        }
    }
    return (
        <div className="AdminLogin">
            <div className='col-12 col-lg-4'>
                <div className='title'>Admin Login</div>
                <div className='mb-3'>
                    <label>Email</label>
                    <input type='email'
                        className='form-control'
                        placeholder='Email...'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label>Password</label>
                    <div className='input-wrap'>
                        <input
                            type={isShowPassword ? 'text' : 'password'}
                            className='form-control'
                            placeholder='Password...'
                            autoComplete='off'
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            onKeyDown={(event) => handlePressEnter(event)}
                        />
                        <div className='icon-eye'>
                            <i className={isShowPassword ? "fa-regular fa-eye" : "fa-regular fa-eye-slash"}
                                onClick={() => setIsShowPassword(!isShowPassword)}
                            ></i>
                        </div>
                    </div>
                </div>
                <button
                    className={email && password ? 'active' : ''}
                    disabled={email && password ? false : true}
                    onClick={() => handleLogin()}
                >
                    Login
                </button>
            </div>
        </div>
    )
}

export default AdminLogin;