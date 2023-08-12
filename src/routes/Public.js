import { Outlet } from 'react-router-dom';
import Header from '../client/components/Header';
import Footer from '../client/components/Footer';

const Public = () => {

    return (
        <div id='app' style={{ marginTop: '114px' }}>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Public;