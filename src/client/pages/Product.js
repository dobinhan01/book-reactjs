import './Product.scss'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { getProductById } from '../../redux/actions/productAction';
import { addProductToCart } from '../../redux/actions/cartAction';
import { toast } from 'react-toastify';
import Review from '../components/review/Review';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';

const Product = () => {

    const location = useLocation();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const { product } = useSelector(state => state.product);
    const id = location.pathname.split('/')[2];

    useEffect(() => {
        dispatch(getProductById(id));
    }, [dispatch, id])

    const handleImg = (img) => {
        if (img) {
            return new Buffer.from(img, 'base64').toString('binary');
        }
    }

    const handleQuantity = (type) => {
        if (type === 'dec') {
            quantity > 1 && setQuantity(quantity - 1)
        } else {
            setQuantity(quantity + 1)
        }
    }

    const handleClick = () => {
        dispatch(addProductToCart({ ...product, quantity }));
        toast.success('Add product to cart success')
    }

    return (
        <div className='ProductDetail'>
            <Breadcrumb
                children1={product?.title}
                navigate1={product?.title}
                children2='products'
                navigate2='/products'
            />
            <div className='container d-flex my-5'>
                <div className='left'>
                    <img src={handleImg(product?.img)} alt='' width='572' height='764' />
                </div>
                <div className='right'>
                    <div className='title'>{product?.title}</div>
                    <div className="author">Tác giả: <span>{product?.author}</span></div>
                    <div className="publisher">Nhà xuất bản: <span>{product?.Publisher.name}</span></div>
                    <div className='price'>
                        <NumericFormat value={product?.price}
                            displayType={'text'}
                            suffix={'đ'}
                            thousandSeparator=","
                        />
                    </div>
                    <div className='desc'>{product?.desc}</div>
                    <div className='add-container'>
                        <div className='amount-container'>
                            <button className='minus'
                                onClick={() => handleQuantity('dec')}
                            >
                                <i className='bx bx-minus'></i>
                            </button>
                            <span className='amount'>{quantity}</span>
                            <button className='plus'
                                onClick={() => handleQuantity('inc')}
                            >
                                <i className='bx bx-plus' ></i>
                            </button>
                        </div>
                        <button className='add-to-cart'
                            onClick={() => handleClick()}
                        >
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                    <div className='extra-info'>
                        <div className='item'>
                            <div className='info-icon'><i className="fa-solid fa-truck"></i></div>
                            <div className='info-text'>Thường được gửi đi trong 2 đến 3 ngày</div>
                        </div>
                        <div className='item'>
                            <div className='info-icon'><i className="fa-solid fa-file-invoice-dollar"></i></div>
                            <div className='info-text'>Thanh toán an toàn và bảo mật</div>
                        </div>
                    </div>
                    <div className='meta'>
                        <div className='meta-wrap'>
                            <span className='label'>Danh mục: </span>
                            <span className='value'>{product?.Category?.name}</span>
                        </div>
                    </div>
                    <Review product={product} />
                </div>
            </div>
        </div>
    )
}

export default Product; 