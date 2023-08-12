import { Outlet } from 'react-router-dom';
import Sidebar from "../admin/components/sidebar/Sidebar";
import Header from '../admin/pages/header/Header';

const Private = (props) => {
    return (
        <div className='Admin'
            style={{
                background: 'linear-gradient(106.37deg, #ffe1bc 29.63%,#ffcfd1 51.55%,#f3c6f1 90.85%)', minHeight: '100vh'
            }}
        >
            <div className='admin-wrap'>
                <Sidebar />
                <div style={{ marginLeft: '16rem' }}>
                    <Header />
                    <Outlet />
                </div>
            </div>
        </div >
    )
}

export default Private;