import './Cart.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { NumericFormat } from 'react-number-format';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import { changeProductToCart, removeProductToCart } from '../../redux/actions/cartAction';
import { toast } from 'react-toastify';
import imgNoCart from '../../assets/images/no-cart.png';

const Cart = () => {

    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.auth);
    const cart = useSelector(state => state.cart);

    const handleChange = (item, key) => {
        if (key === 'minus' && item.quantity > 1) {
            dispatch(changeProductToCart({ ...item, quantity: --item.quantity }));
        }
        if (key === 'plus' && item.quantity < 10) {
            dispatch(changeProductToCart({ ...item, quantity: ++item.quantity }));
        }
    }

    const handleRemove = (item) => {
        dispatch(removeProductToCart(item));
        toast.success('Removed product success');
    }

    const handleCheckout = (event) => {
        if (!currentUser) {
            event.preventDefault()
            if (window.confirm("You are not logged in. Are you sure you want to replicate ?")) {
                window.location.replace('/login');
            }
        }
    }

    return (
        <div className='cart-container'>
            <Breadcrumb
                children1='giỏ hàng'
                navigate1='/cart'
            />
            <div className='container'>
                {cart.quantity !== 0 ?
                    <div className='content'>
                        <div className='col-8'>
                            <table>
                                <thead>
                                    <tr>
                                        <th className='thumbnail'></th>
                                        <th>Tên sách</th>
                                        <th>Giá</th>
                                        <th>Số lượng</th>
                                        <th>Thành tiền</th>
                                        <th className='remove'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.products.map((item, index) => {
                                        const previewImg = new Buffer.from(item.img, 'base64').toString('binary');
                                        return (
                                            <tr key={index}>
                                                <td className='thumbnail'>
                                                    <img src={previewImg} alt="" width='213' height='284' />
                                                </td>
                                                <td className='name'>{item.title}</td>
                                                <td>
                                                    <NumericFormat value={item.price}
                                                        displayType={'text'}
                                                        suffix={'đ'}
                                                        thousandSeparator=","
                                                    />
                                                </td>
                                                <td className='quantity'>
                                                    <div className='quantity-wrap'>
                                                        <div className='icon'
                                                            onClick={() => handleChange(item, 'minus')}
                                                        >
                                                            <i className="fa-solid fa-minus"></i>
                                                        </div>
                                                        <input type='text' value={item.quantity} disabled />
                                                        <div className='icon'
                                                            onClick={() => handleChange(item, 'plus')}
                                                        >
                                                            <i className="fa-solid fa-plus"></i>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <NumericFormat value={item.price * item.quantity}
                                                        displayType={'text'}
                                                        suffix={'đ'}
                                                        thousandSeparator=","
                                                    />
                                                </td>
                                                <td className='remove'
                                                    onClick={() => handleRemove(item)}
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className='col-4'>
                            <div className='cart-total'>
                                <h2>Tổng tiền</h2>
                                <ul>
                                    <li>
                                        <div>Thành tiền</div>
                                        <div>
                                            <NumericFormat value={cart.total}
                                                displayType={'text'}
                                                suffix={'đ'}
                                                thousandSeparator=","
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div>Tổng số tiền</div>
                                        <div>
                                            <NumericFormat value={cart.total}
                                                displayType={'text'}
                                                suffix={'đ'}
                                                thousandSeparator=","
                                            />
                                        </div>
                                    </li>
                                </ul>
                                <div className='checkout'>
                                    <Link to='/checkout'
                                        onClick={(event) => handleCheckout(event)}
                                    >Thanh toán</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className='no-cart'>
                        <img src={imgNoCart} alt='' width='100px' height='100px' />
                        <h3>Giỏ hàng của bạn đang trống</h3>
                        <Link to='/products' className='btn'>Mua sắm ngay</Link>
                    </div>
                }
            </div>
        </div>
    )
}

export default Cart;