import Cards from '../cards/Cards';
import Tables from '../tables/Tables';

const MainDash = (props) => {
    return (
        <div className='MainDash col-8 px-3 pb-5'>
            <h1 style={{ marginBottom: '30px' }}>Dashboard</h1>
            <Cards />
            <h3>Đơn hàng mới nhất</h3>
            <Tables />
        </div>
    )
}

export default MainDash;