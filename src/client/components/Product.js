import './Product.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { addProductToCart } from '../../redux/actions/cartAction';
import ModalQuickView from './modals/ModalQuickView';
import { createWishlist } from '../../redux/actions/wishlistAction';

const Product = (props) => {

    let localStorageData = window.localStorage.getItem('persist:auth');
    localStorageData = JSON.parse(localStorageData);
    const userId = JSON.parse(localStorageData?.currentUser)?.id;

    const dispatch = useDispatch();

    const { item, discounts } = props;
    const [isShowModalQuickView, setIsShowModalQuickView] = useState(false);

    const handleDiscount = (key) => {
        if (discounts) {
            let value = discounts.find(item => item.key === key)?.value;
            return value;
        }
    }

    const handleImg = (img) => {
        if (img) {
            return new Buffer.from(img, 'base64').toString('binary');
        }
    }

    const handleClose = () => {
        setIsShowModalQuickView(false);
    }

    const handleAddToWishlist = () => {
        const payload = { userId, productId: item.id };
        dispatch(createWishlist(payload));
    }

    const handleAddToCart = () => {
        dispatch(addProductToCart({ ...item, quantity: 1 }));
    }

    return (<>
        <div className="Product">
            <div className="image">
                <img src={handleImg(item?.img)} alt="" width="550" height="680" />
                {handleDiscount(item?.discount) !== '0' &&
                    <div className="discount-wrap">
                        <div className="discount">
                            <span>-{handleDiscount(item?.discount)}%</span>
                        </div>
                    </div>
                }
                <div className="button-wrap">
                    <div className="button"
                        onClick={() => setIsShowModalQuickView(true)}
                    >
                        <div className="icon icon-1">
                            <i className="fa-regular fa-eye"></i>
                        </div>
                        <span>Xem nhanh</span>
                    </div>
                    <Link to={`/product/${item?.id}`} className="button">
                        <div className="icon icon-2">
                            <i className='bx bx-info-circle'></i>
                        </div>
                        <span>Chi tiết sách</span>
                    </Link>
                    <div className="button"
                        onClick={() => handleAddToWishlist()}
                    >
                        <div className="icon icon-3">
                            <i className='bx bx-heart'></i>
                        </div>
                        <span>Thêm vào mục yêu thích</span>
                    </div>
                    <div className="button"
                        onClick={() => handleAddToCart()}
                    >
                        <div className="icon icon-4">
                            <i className='bx bx-cart' ></i>
                        </div>
                        <span>Thêm vào giỏ hàng</span>
                    </div>
                </div>
            </div>
            <Link to={`/product/${item?.id}`} className="info">
                <div className="category">{item?.Category.name}</div>
                <div className="name">{item?.title}</div>
                {item?.oldPrice === item?.price ?
                    <div className="price">
                        <span>
                            <NumericFormat value={item?.price}
                                displayType={'text'}
                                suffix={'đ'}
                                thousandSeparator=","
                            />
                        </span>
                    </div>
                    :
                    <div className="price">
                        <span className="old">
                            <NumericFormat value={item?.oldPrice}
                                displayType={'text'}
                                suffix={'đ'}
                                thousandSeparator=","
                            />
                        </span>
                        <span>
                            <NumericFormat value={item?.price}
                                displayType={'text'}
                                suffix={'đ'}
                                thousandSeparator=","
                            />
                        </span>
                    </div>
                }
            </Link>
        </div>
        <ModalQuickView
            show={isShowModalQuickView}
            handleClose={handleClose}
            dataProduct={item}
        />
    </>)
}

export default Product;