import './Sidebar.scss';
import logo from '../../../assets/images/logo.png';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const dataMenu = [
    {
        icon: <i className='bx bx-home-alt'></i>,
        heading: 'Dashboard',
        link: '/admin'
    },
    {
        icon: <i className='bx bx-book-bookmark'></i>,
        heading: 'Danh mục',
        link: '/admin/category'
    },
    {
        icon: <i className='bx bx-user'></i>,
        heading: 'Nhà xuất bản',
        link: '/admin/publisher'
    },
    {
        icon: <i className='bx bx-package'></i>,
        heading: 'Sản phẩm',
        link: '/admin/product'
    },
    {
        icon: <i className='bx bx-clipboard'></i>,
        heading: 'Đơn hàng',
        link: '/admin/order'
    },
    {
        icon: <i className='bx bx-user-circle'></i>,
        heading: 'Tài khoản',
        link: '/admin/account'
    },
    {
        icon: <i className='bx bxs-contact'></i>,
        heading: 'Liên hệ',
        link: '/admin/contact'
    },
    {
        icon: <i className='bx bxl-blogger'></i>,
        heading: 'Blog',
        link: '/admin/blog'
    }
]

const Sidebar = (props) => {

    const location = useLocation();
    const path = location.pathname;
    const [selected, setSelected] = useState(path);

    return (
        <div className='sidebar-container'>
            <div className='logo'>
                <img src={logo} alt='' />
                <span>
                    Sh<span>o</span>ps
                </span>
            </div>
            <div className='menu'>
                {dataMenu.map((item, index) => {
                    return (
                        <Link to={item.link} className={selected === item.link ? 'item active' : 'item'}
                            key={index}
                            onClick={() => setSelected(item.link)}
                        >
                            {item.icon}
                            <span>{item.heading}</span>
                        </Link>
                    )
                })}
            </div>
            {/* <div className='logout'>
                <i className='bx bx-log-in-circle'></i>
            </div> */}
        </div >
    )
}

export default Sidebar;