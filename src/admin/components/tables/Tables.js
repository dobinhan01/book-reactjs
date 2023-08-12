import './Tables.scss';
import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllcode } from '../../../redux/actions/userAction';
import { fetchLatestOrders } from '../../../redux/actions/orderAction';

const Tables = (props) => {

    const dispatch = useDispatch();
    const { latestOrders } = useSelector(state => state.order);
    const { allcodes } = useSelector(state => state.user);
    const [statuses, setStatuses] = useState([]);
    const [dataOrder, setDataOrder] = useState([]);

    useEffect(() => {
        dispatch(fetchLatestOrders());
        dispatch(fetchAllcode());
    }, [dispatch])

    useEffect(() => {
        if (allcodes) {
            setStatuses(allcodes.statuses);
        }
    }, [allcodes])

    useEffect(() => {
        setDataOrder(latestOrders)
    }, [latestOrders])

    const getValueStatus = (key) => {
        let value = statuses?.find(item => item.key === key)?.value;
        return value;
    }

    // const handleDetailOrder = (order) => {
    //     console.log(order)
    // }

    return (
        <Table striped bordered hover variant="light" style={{ marginBottom: '0' }}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Total</th>
                    <th>Status</th>
                    {/* <th>Actions</th> */}
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
                            {/* <td>
                                <button
                                    className='btn btn-success m-1'
                                    onClick={() => handleDetailOrder(item)}
                                >Detail</button>
                            </td> */}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default Tables;