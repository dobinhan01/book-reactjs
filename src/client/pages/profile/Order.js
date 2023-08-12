import { Table } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllcode } from '../../../redux/actions/userAction';
import { fetchOrdersByUserId } from '../../../redux/actions/orderAction';
import { useNavigate } from "react-router-dom";

const Order = (props) => {

    const { id } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { ordersByUserId } = useSelector(state => state.order);
    const { allcodes } = useSelector(state => state.user);
    const [statuses, setStatuses] = useState([]);
    const [dataOrder, setDataOrder] = useState([]);

    useEffect(() => {
        dispatch(fetchOrdersByUserId(id));
        dispatch(fetchAllcode());
    }, [dispatch, id])

    useEffect(() => {
        if (allcodes) {
            setStatuses(allcodes.statuses);
        }
    }, [allcodes])

    useEffect(() => {
        setDataOrder(ordersByUserId)
    }, [ordersByUserId])

    const getValueStatus = (key) => {
        let value = statuses?.find(item => item.key === key)?.value;
        return value;
    }

    const handleDetailOrder = async (item) => {
        navigate(`/order/${item.id}`)
    }

    return (
        <>
            {dataOrder.length !== 0 ?
                <Table striped bordered hover variant="light" style={{ marginBottom: '0' }}>
                    <thead>
                        <tr>
                            <th>Tên</th>
                            <th>Số điện thoại</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataOrder?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.phone}</td>
                                    <td>
                                        <NumericFormat value={item.total}
                                            displayType={'text'}
                                            suffix={'đ'}
                                            thousandSeparator=","
                                        />
                                    </td>
                                    <td>{getValueStatus(item.status)}</td>
                                    <td>
                                        <button
                                            className='btn btn-success m-1'
                                            onClick={() => handleDetailOrder(item)}
                                        >Chi tiết</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                :
                <div>Your order is empty</div>
            }
        </>)
}

export default Order;