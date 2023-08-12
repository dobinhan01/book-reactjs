import './RightSlide.scss';
import Updates from '../updates/Updates';
// import CustomerReview from '../customerreview/CustomerReview';

const RightSlide = (props) => {
    return (
        <div className='RightSlide col-4'>
            <div>
                <h3>Thông báo</h3>
                <Updates />
            </div>
            {/* <div>
                <h3>Customer Review</h3>
                <CustomerReview />
            </div> */}
        </div>
    )
}

export default RightSlide;