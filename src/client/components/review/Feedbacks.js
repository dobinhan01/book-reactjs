// import './Feedback.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviewsByProductId } from '../../../redux/actions/reviewAction';
import Feedback from './Feedback';

const Feedbacks = (props) => {
    const { productId } = props;
    const dispatch = useDispatch();
    const { reviewsByProductId } = useSelector(state => state.review);

    useEffect(() => {
        dispatch(fetchReviewsByProductId(productId));
    }, [dispatch, productId])

    return (
        <div className='d-flex flex-column'>
            {reviewsByProductId.map((item, index) => {
                return (
                    <Feedback key={index} item={item} />
                )
            })}
        </div>
    )
}

export default Feedbacks; 