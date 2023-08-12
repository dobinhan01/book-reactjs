import './OrderDetail.scss';
import { Table } from 'react-bootstrap';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NumericFormat } from 'react-number-format';
import { fetchOrderDetailById } from '../../../redux/actions/orderAction';
import { Link, useLocation } from 'react-router-dom';

const OrderDetail = (props) => {

    const location = useLocation();
    const orderId = location.pathname.split('/')[2];
    const dispatch = useDispatch();
    const { orderDetails } = useSelector(state => state.order);

    useEffect(() => {
        dispatch(fetchOrderDetailById(orderId))
    }, [dispatch, orderId])
    console.log(orderDetails.order)
    return (
        <div className='OrderDetail'>
            <div className="title">
                <div className='container'>Order Detail</div>
            </div>
            <div className="container">
                <div className='row pt-3'>
                    <div className='col-5'>
                        <h5 className='mb-5'>Purchase Receipt</h5>
                        <div className="row">
                            <div className="col-6 mb-3">
                                <p className="small text-muted mb-1">Date</p>
                                <p>{orderDetails.order?.date}</p>
                            </div>
                            <div className="col-6 mb-3">
                                <p className="small text-muted mb-1">Order No.</p>
                                <p>{orderDetails.order?.id}</p>
                            </div>
                            <div className="col-6 mb-3">
                                <p className="small text-muted mb-1">Name</p>
                                <p>{orderDetails.order?.name}</p>
                            </div>
                            <div className="col-6 mb-3">
                                <p className="small text-muted mb-1">Address</p>
                                <p>{orderDetails.order?.address}</p>
                            </div>
                            <div className="col-6 mb-3">
                                <p className="small text-muted mb-1">Note</p>
                                <p>{orderDetails.order?.note}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-7'>
                        <h5 className='mb-5'>Order Detail</h5>
                        <Table striped bordered hover variant="light" style={{ marginBottom: '0' }}>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetails.orderDetail?.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.Product.title}</td>
                                            <td>
                                                <NumericFormat value={item.Product.price}
                                                    displayType={'text'}
                                                    suffix={'đ'}
                                                    thousandSeparator=","
                                                />
                                            </td>
                                            <td>{item.quantity}</td>
                                            <td>
                                                <NumericFormat value={item.Product.price * item.quantity}
                                                    displayType={'text'}
                                                    suffix={'đ'}
                                                    thousandSeparator=","
                                                />
                                            </td>
                                            <td>
                                                <Link to={`/product/${item.Product.id}`}>Feedback</Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                        <div className='my-3 float-end fw-bolder fs-5'>
                            Grand Total:
                            <span className='ms-5'>
                                <NumericFormat value={orderDetails.order?.total}
                                    displayType={'text'}
                                    suffix={'đ'}
                                    thousandSeparator=","
                                />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="cus-detail">
                </div>
            </div>
        </div>
    )
}

export default OrderDetail;