import MainDash from '../components/maindash/MainDash';
import RightSlide from '../components/rightslide/RightSlide';

const HomeAdmin = (props) => {
    return (
        <div className='HomeAdmin d-flex ' style={{ padding: '76px 16px 0' }}>
            <MainDash />
            <RightSlide />
        </div>
    )
}

export default HomeAdmin;