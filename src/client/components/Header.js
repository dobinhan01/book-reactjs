import './Header.scss'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import logo from '../../assets/images/logo.png';
import imgNoCart from '../../assets/images/no-cart.png';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser, logout } from '../../redux/actions/authAction';
import { fetchCategoryHome } from '../../redux/actions/categoryAction';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSearch, setIsSearch] = useState(false);
    const [listCate, setListCate] = useState([]);

    const { isLoggedIn } = useSelector(state => state.auth);
    const { categoryHome } = useSelector(state => state.category);
    const cart = useSelector(state => state.cart);

    useEffect(() => {
        if (isLoggedIn) {
            setTimeout(() => dispatch(getCurrentUser()), 1000);
        }
    }, [dispatch, isLoggedIn])

    useEffect(() => {
        dispatch(fetchCategoryHome(5));
    }, [dispatch])

    useEffect(() => {
        setListCate(categoryHome);
    }, [categoryHome])

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login')
    }

    const handleKeyPress = (event) => {
        const search = event.target.value.trim();
        if (event.key === "Enter") {
            event.preventDefault();
            navigate(`/products?q=${search}`);
            setIsSearch(false)
        }
    }

    return (
        <div className='header-container'>
            <div className='header-top'>
                <div className='container d-flex justify-content-between'>
                    <div className='ht-left'>MIỄN PHÍ VẬN CHUYỂN TOÀN CẦU</div>
                    <div className='ht-right'>
                        <i className="fa-brands fa-twitter"></i>
                        <i className="fa-brands fa-facebook"></i>
                        <i className="fa-brands fa-pinterest-p"></i>
                        <i className="fa-brands fa-instagram"></i>
                        <i className="fa-brands fa-linkedin"></i>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='inner-header'>
                    <Link to='/' className='logo'>
                        <img src={logo} alt='' />
                        <span>BOOK<span>HOUSE</span></span>
                    </Link>
                    {isSearch ?
                        <div className='search'>
                            <form >
                                <input
                                    type='text'
                                    autoComplete='off'
                                    placeholder='Tìm kiếm theo tên sách'
                                    onKeyPress={(event) => handleKeyPress(event)}
                                />
                                <span className='icon-close'
                                    onClick={() => setIsSearch(false)}
                                >
                                    <i className="fa-regular fa-circle-xmark"></i>
                                </span>
                            </form>
                        </div>
                        :
                        <div className='nav'>
                            <Navbar expand="lg">
                                <Container>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className="m-auto">
                                            <Link to='/' className='nav-link'>TRANG CHỦ</Link>
                                            <div className='nav-link category'>
                                                SẢN PHẨM
                                                <i className="fa-solid fa-chevron-down"></i>
                                                <div className='category-wrap'>
                                                    <ul>
                                                        {listCate?.length > 0 &&
                                                            listCate.sort((a, b) => a.name.length - b.name.length)
                                                                .map((item, index) => {
                                                                    return (
                                                                        <li key={index}>
                                                                            <Link to={`products/${item.slug}`} className='nav-link'>
                                                                                {item.name}
                                                                            </Link>
                                                                        </li>
                                                                    )
                                                                })
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                            <Link to='/products' className='nav-link'>SHOP</Link>
                                            <Link to='/blogs' className='nav-link'>BLOG</Link>
                                            <Link to='/contact-us' className='nav-link'>LIÊN HỆ</Link>
                                        </Nav>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                        </div>
                    }
                    <div className='group-icon'>
                        <div className='box-icon icon-user'>
                            <i className="fa-solid fa-user"></i>
                            <div className='user-wrap'>
                                {isLoggedIn ?
                                    <ul>
                                        <li>
                                            <Link to='/profile'>
                                                <i className="fa-regular fa-address-card"></i>
                                                <p>Tài khoản</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to='/wishlist'>
                                                <i className="fa-regular fa-heart"></i>
                                                <p>Danh sách yêu thích</p>
                                            </Link>
                                        </li>
                                        <li onClick={() => handleLogout()}>
                                            <i className="fa-solid fa-circle-arrow-right"></i>
                                            <p>Đăng suất</p>
                                        </li>
                                    </ul>
                                    :
                                    <ul>
                                        <li>
                                            <Link to='/login'>
                                                <i className="fa-regular fa-address-card"></i>
                                                <p>Đăng nhập</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to='/signup'>
                                                <i className="fa-regular fa-address-card"></i>
                                                <p>Đăng ký</p>
                                            </Link>
                                        </li>
                                    </ul>
                                }
                            </div>
                        </div>
                        <div className='box-icon icon-cart'>
                            <i className="fa-solid fa-cart-shopping"></i>
                            <span className='quantity'>{cart?.quantity}</span>
                            <div className='cart-wrap'>
                                <div className='top'>
                                    <i className="fa-solid fa-cart-shopping"></i>
                                    <p>Giỏ hàng của bạn({cart?.quantity})</p>
                                </div>
                                <div className='center'>
                                    <ul>
                                        {cart.quantity !== 0 ?
                                            cart.products.map((item, index) => {
                                                const previewImg = new Buffer.from(item.img, 'base64').toString('binary');
                                                return (
                                                    <li key={index}>
                                                        <div className='image'>
                                                            <img src={previewImg} alt='' width='68' height='68' />
                                                        </div>
                                                        <div className='info'>
                                                            <div className='name'>{item.title}</div>
                                                            <div className='price'>
                                                                <span>
                                                                    <NumericFormat value={item.price}
                                                                        displayType={'text'}
                                                                        suffix={'đ'}
                                                                        thousandSeparator=","
                                                                    />
                                                                </span>x{item.quantity}
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                            :
                                            <div className='no-cart'>
                                                <img src={imgNoCart} alt='' />
                                                <p>Giỏ hàng của bạn hiện đang trống</p>
                                            </div>
                                        }
                                    </ul>
                                </div>
                                {cart?.quantity !== 0 && <div className='bottom'>
                                    <div className='total'>
                                        <span className='label'>Thành tiền:</span>
                                        <span>
                                            <NumericFormat value={cart.total}
                                                displayType={'text'}
                                                suffix={'đ'}
                                                thousandSeparator=","
                                            />
                                        </span>
                                    </div>
                                    <Link to='cart' className='btn view-cart'>Giỏ hàng</Link>
                                    <Link to='checkout' className='btn checkout'>Thanh toán</Link>
                                </div>}
                            </div>
                        </div>
                        <div className='box-icon icon-search'
                            onClick={() => setIsSearch(true)}
                        >
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Header;