import './Review.scss';
import Feedbacks from './Feedbacks';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { creatReview } from '../../../redux/actions/reviewAction';
import { toast } from 'react-toastify';
import { fetchOrderDetailByProductId } from '../../../redux/actions/orderAction';

const Review = (props) => {
    const { product } = props;
    const dispatch = useDispatch();
    const starts = Array(5).fill(0);
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [feedback, setFeedback] = useState('');

    const [listOrderDetail, setListOrderDetail] = useState([]);
    const { orderDetailsByProductId } = useSelector(state => state.order);
    const { currentUser } = useSelector(state => state.auth);
    const userId = currentUser?.id;
    const productId = product?.id;

    useEffect(() => {
        dispatch(fetchOrderDetailByProductId(productId));
    }, [dispatch, productId])
    useEffect(() => {
        if (orderDetailsByProductId) {
            setListOrderDetail(orderDetailsByProductId)
        }
    }, [orderDetailsByProductId])

    const handleClick = value => {
        setCurrentValue(value)
    }

    const handleMouseOver = newHoverValue => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }

    const handleSubmit = () => {
        if (currentValue === 0 || feedback === '') {
            toast.error('Missing required parameters!');
        }
        else {
            const currentDate = new Date();
            const date = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
            const payload = { stars: currentValue, review: feedback, date, userId, productId }
            dispatch(creatReview(payload));
            setCurrentValue(0);
            setFeedback('');
        }
    }
    console.log(listOrderDetail)
    return (
        <div className='Review'>
            <h3>Đánh giá</h3>
            {listOrderDetail?.some((item) => (item.Order.userId === userId && item.Order.status === 'S3')) &&
                <div className='feedback'>
                    <div className="stars">
                        {starts.map((_, index) => {
                            return (
                                <i key={index}
                                    className={(hoverValue || currentValue) > index ? "fa-solid fa-star active" : "fa-solid fa-star"}
                                    onClick={() => handleClick(index + 1)}
                                    onMouseOver={() => handleMouseOver(index + 1)}
                                    onMouseLeave={handleMouseLeave}
                                ></i>
                            )
                        })}
                    </div>
                    <textarea placeholder="Phản hồi của bạn là gì?" className='textarea'
                        value={feedback}
                        onChange={(event) => setFeedback(event.target.value)}
                    />
                    <button className='btn' onClick={() => handleSubmit()}>Gửi</button>
                </div>
            }
            <Feedbacks productId={productId} />
        </div>
    )
}

export default Review; 