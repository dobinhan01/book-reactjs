import './Header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import imgAvatarDefault from '../../../assets/images/default-avatar.png';
import { getUserInfo } from '../../../redux/actions/userAction';
import { useEffect } from 'react';
import { logout } from '../../../redux/actions/authAction';

const Header = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.auth);
    const { userInfo } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getUserInfo(currentUser.id));
    }, [dispatch, currentUser])

    const handlePreviewImg = (img) => {
        if (typeof img === 'string') {
            return img
        } else {
            return new Buffer(img, 'base64').toString('binary')
        }
    }

    const handleLogout = () => {
        dispatch(logout());
        navigate('/admin/login')
    }

    return (
        <div className='Header'>
            <div className="user">
                <p className='text'>Chào mừng, <span>{currentUser?.username}</span></p>
                <div className='icon-user'>
                    <img src={handlePreviewImg(userInfo.img || imgAvatarDefault)} alt='' width='40' height='40' />
                    <div className="user-wrap">
                        <ul>
                            {/* <li>
                                <Link to='/view-profile'>
                                    <i className="fa-regular fa-address-card"></i>
                                    <p>Tài khoản</p>
                                </Link>
                            </li>
                            <hr className='my-2' /> */}
                            <li onClick={() => handleLogout()}>
                                <i className="fa-solid fa-circle-arrow-right"></i>
                                <p>Đăng suất</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;