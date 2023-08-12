import './Login.scss';
import { useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/authAction';

const Login = () => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);

    const { isLoading } = useSelector(state => state.auth);

    const handleLogin = async () => {
        dispatch(login(email, password));
    }

    const handlePressEnter = async (event) => {
        if (event?.key === 'Enter') {
            await handleLogin();
        }
    }

    return (<>
        <div className="login-container">
            <div className='col-12 col-lg-4'>
                <div className='title'>Đăng nhập</div>
                <div className='mb-3'>
                    <label>Email</label>
                    <input type='email'
                        className='form-control'
                        placeholder='Email...'
                        autoComplete='off'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label>Mật khẩu</label>
                    <div className='input-wrap'>
                        <input
                            type={isShowPassword ? 'text' : 'password'}
                            className='form-control'
                            placeholder='Mật khẩu...'
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
                    {isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}
                    &nbsp;Đăng nhập
                </button>
                <Link to='/signup' className='float-end'>Tạo tài khoản</Link>
            </div>
        </div>
    </>)
}

export default Login;