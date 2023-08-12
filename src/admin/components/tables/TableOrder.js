import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { NumericFormat } from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllcode } from '../../../redux/actions/userAction';
import { deleteOrder, updateOrder } from '../../../redux/actions/orderAction';

const TableOrder = (props) => {

    const { listOrder } = props;
    const dispatch = useDispatch();
    const { allcodes } = useSelector(state => state.user);
    const [payments, setPayments] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [dataOrder, setDataOrder] = useState([]);

    useEffect(() => {
        dispatch(fetchAllcode());
    }, [dispatch])

    useEffect(() => {
        if (allcodes) {
            setPayments(allcodes.payments);
            setStatuses(allcodes.statuses);
        }
    }, [allcodes])

    useEffect(() => {
        setDataOrder(listOrder)
    }, [listOrder])

    const getValuePayment = (key) => {
        let value = payments?.find(item => item.key === key)?.value;
        return value;
    }

    const handleSort = (sort, sortField) => {
        let cloneListOrder = _.cloneDeep(dataOrder);
        cloneListOrder = _.orderBy(cloneListOrder, [sortField], [sort])
        setDataOrder(cloneListOrder)
    }

    const handleStatus = (event, order) => {
        const status = event.target.value;
        if (window.confirm('Bạn có chắc chắn muốn thay đổi?')) {
            dispatch(updateOrder(order.id, status))
        }
    }

    const handleDeleteOrder = (order) => {
        dispatch(deleteOrder(order.id));
    }

    return (
        <Table striped bordered hover variant="light" style={{ marginBottom: '0' }}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên
                        <span className='float-end'>
                            <i className="fa-solid fa-arrow-down-long p-1"
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleSort('desc', 'name')}
                            ></i>
                            <i className="fa-solid fa-arrow-up-long p-1 "
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleSort('asc', 'name')}
                            ></i>
                        </span>
                    </th>
                    <th>Địa chỉ giao hàng</th>
                    <th>Số điện thoại</th>
                    <th>Tổng tiền</th>
                    <th>Phương thức thanh toán</th>
                    <th>Trạng thái</th>
                    <th>Ngày cập nhật</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {dataOrder?.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.address}</td>
                            <td>{item.phone}</td>
                            <td>
                                <NumericFormat value={item.total}
                                    displayType={'text'}
                                    suffix={'đ'}
                                    thousandSeparator=","
                                />
                            </td>
                            <td>{getValuePayment(item.payment)}</td>
                            <td>
                                <select className="form-select"
                                    value={item.status}
                                    onChange={(event) => handleStatus(event, item)}
                                >
                                    {statuses?.map((status, index) => {
                                        return (
                                            <option key={index}
                                                value={status.key}
                                            >{status.value}</option>
                                        )
                                    })}
                                </select>
                            </td>
                            <td>{item.date}</td>
                            <td>
                                <button
                                    className='btn btn-danger m-1'
                                    onClick={() => handleDeleteOrder(item)}
                                >Xóa</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default TableOrder;