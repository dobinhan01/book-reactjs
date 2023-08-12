import './Checkout.scss';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { NumericFormat } from 'react-number-format';
import { getUserInfo } from '../../redux/actions/userAction';
import { useNavigate } from 'react-router-dom';
import { fetchAllcode } from '../../redux/actions/userAction';
import { createOrder } from '../../redux/actions/orderAction';


const Checkout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.auth);
    const { userInfo } = useSelector(state => state.user);
    const { allcodes } = useSelector(state => state.user);
    const cart = useSelector(state => state.cart);
    const [payments, setPayments] = useState([]);

    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [payment, setPayment] = useState('PAY1');
    const [note, setNote] = useState('');

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        } else {
            dispatch(getUserInfo(currentUser.id));
            dispatch(fetchAllcode());
        }
    }, [dispatch, navigate, currentUser])

    useEffect(() => {
        if (allcodes) {
            setPayments(allcodes.payments)
        }
    }, [allcodes])

    useEffect(() => {
        if (userInfo) {
            setFirstname(userInfo.firstName || '');
            setLastname(userInfo.lastName || '');
            setAddress(userInfo.address || '');
            setPhone(userInfo.phone || '');
        }
    }, [userInfo])

    const handlePlaceOrder = () => {
        const current = new Date();
        const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;
        const payload = {
            firstName, lastName, address, phone, payment, note, date,
            total: cart.total,
            userId: currentUser.id,
            orderDetail: cart.products.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
                total: item.quantity * item.price
            }))
        };
        dispatch(createOrder(payload, navigate));
    }

    return (
        <div className='checkout-container'>
            <Breadcrumb
                children1='Thanh toán'
                navigate1='/checkout'
            />
            <div className='container'>
                <div className='content'>
                    <div className='left col-6'>
                        <h2>Chi tiết hóa đơn</h2>
                        <form>
                            <div className='form-group col-6'>
                                <label className="form-label">
                                    Họ
                                    <span className="wpforms-required-label">*</span>
                                </label>
                                <input type="text" className="form-control"
                                    value={firstName}
                                    onChange={(event) => setFirstname(event.target.value)}
                                />
                            </div>
                            <div className='form-group col-6'>
                                <label className="form-label">
                                    Tên
                                    <span className="wpforms-required-label">*</span>
                                </label>
                                <input type="text" className="form-control"
                                    value={lastName}
                                    onChange={(event) => setLastname(event.target.value)}
                                />
                            </div>
                            <div className='form-group col-12'>
                                <label className="form-label">
                                    Địa chỉ nhận hàng
                                    <span className="wpforms-required-label">*</span>
                                </label>
                                <input type="text" className="form-control"
                                    value={address}
                                    onChange={(event) => setAddress(event.target.value)}
                                />
                            </div>
                            <div className='form-group col-12'>
                                <label className="form-label">
                                    Số điện thoại
                                    <span className="wpforms-required-label">*</span>
                                </label>
                                <input type="text" className="form-control"
                                    value={phone}
                                    onChange={(event) => setPhone(event.target.value)}
                                />
                            </div>
                            <div className='form-group col-12'>
                                <label className="form-label">
                                    Phương thức thanh toán
                                    <span className="wpforms-required-label">*</span>
                                </label>
                                <select className="form-select"
                                    value={payment}
                                    onChange={(event) => setPayment(event.target.value)}
                                >
                                    {payments?.map((item, index) => {
                                        return <option key={index} value={item.key}>{item.value}</option>
                                    })}
                                </select>
                            </div>
                            <div className='form-group col-12'>
                                <label className="form-label">
                                    Ghi chú(không bắt buộc)
                                </label>
                                <textarea type="text" className="form-control"
                                    placeholder='Ghi chú về đơn đặt hàng của bạn, ví dụ: ghi chú đặc biệt cho giao hàng'
                                    value={note}
                                    onChange={(event) => setNote(event.target.value)}
                                ></textarea>
                            </div>
                        </form>
                    </div>
                    <div className='right col-6'>
                        <h2>Đơn hàng của bạn</h2>
                        <div className='order'>
                            <table>
                                <thead>
                                    <tr>
                                        <th className='name'>Tên sách</th>
                                        <th className="total">Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart?.products?.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="name">{item.title} x{item.quantity}</td>
                                                <td className="total">
                                                    <NumericFormat value={item.price * item.quantity}
                                                        displayType={'text'}
                                                        suffix={'đ'}
                                                        thousandSeparator=","
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                                <tfoot>
                                    <tr className="subtotal">
                                        <th>Thành tiền</th>
                                        <td>
                                            <NumericFormat value={cart?.total}
                                                displayType={'text'}
                                                suffix={'đ'}
                                                thousandSeparator=","
                                            /></td>
                                    </tr>
                                    <tr className="total">
                                        <th>Tổng số tiền</th>

                                        <td>
                                            <NumericFormat value={cart?.total}
                                                displayType={'text'}
                                                suffix={'đ'}
                                                thousandSeparator=","
                                            />
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div className='place-order'>
                                <div className='terms'>
                                    <p>
                                        Dữ liệu cá nhân của bạn sẽ được sử dụng để xử lý đơn đặt hàng của bạn,
                                        và cho các mục đích khác được mô tả trong chính sách bảo mật của chúng tôi
                                    </p>
                                </div>
                                <button className='btn'
                                    onClick={() => handlePlaceOrder()}
                                >Đặt hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;