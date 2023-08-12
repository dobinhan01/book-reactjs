import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/actions/authAction';

const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading } = useSelector(state => state.auth);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const handleRegister = async () => {
        /* eslint-disable no-useless-escape */
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!regex.test(email)) {
            setIsValid(true)
        }
        else {
            dispatch(register(username, email, password, navigate));
        }
    }

    const handleChangeEmail = (event) => {
        /* eslint-disable no-useless-escape */
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (regex.test(email)) {
            setIsValid(false)
        }
        setEmail(event.target.value)
    }

    const handlePressEnter = async (event) => {
        if (event?.key === 'Enter') {
            await handleRegister();
        }
    }

    return (<>
        <div className="login-container">
            <div className='col-12 col-lg-4'>
                <div className='title'>Đăng ký</div>
                <div className='mb-3'>
                    <label>Tên tài khoản</label>
                    <input type='username'
                        className='form-control'
                        placeholder='Tên tài khoản...'
                        autoComplete='off'
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className='mb-3'>
                    <label>Email</label>
                    <input type='email'
                        className={isValid ? 'form-control border-danger' : 'form-control'}
                        placeholder='Email'
                        autoComplete='off'
                        value={email}
                        onChange={(event) => handleChangeEmail(event)}
                        onClick={(event) => setIsValid(false)}
                    />
                    {isValid && <span className="text-danger">Vui lòng nhập đúng định dạng email</span>}
                </div>
                <div className='mb-3'>
                    <label>Mật khẩu</label>
                    <div className='input-wrap'>
                        <input
                            type={isShowPassword ? 'text' : 'password'}
                            className='form-control'
                            placeholder='Mật khẩu'
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
                    className={username && email && password ? 'active' : ''}
                    disabled={username && email && password ? false : true}
                    onClick={() => handleRegister()}
                >
                    {isLoading && <i className="fa-solid fa-spinner fa-spin-pulse"></i>}
                    &nbsp;Đăng ký
                </button>
                <Link to='/login' className='float-end'>Đã có tài khoản</Link>
            </div>
        </div>
    </>)
}

export default Register;