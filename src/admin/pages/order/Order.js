import './Order.scss';
import _ from 'lodash';
import { debounce } from 'lodash';
import TableOrder from '../../components/tables/TableOrder';
import ModalConfirm from '../../components/modals/order/ModalConfirm';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders } from '../../../redux/actions/orderAction';

const Order = () => {

    const dispatch = useDispatch();
    const { orders } = useSelector(state => state.order);
    const [listOrder, setListOrder] = useState([]);

    const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
    const [dataOrderDelete, setDataOrderDelete] = useState({});

    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch])
    useEffect(() => {
        setListOrder(orders)
    }, [orders])

    const handleClose = () => {
        setIsShowModalConfirm(false);
    }

    const handleDeleteOrder = (order) => {
        setDataOrderDelete(order);
        setIsShowModalConfirm(true)
    }

    const handleSearch = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListOrder = _.cloneDeep(orders);
            cloneListOrder = cloneListOrder.filter(item => item.name.includes(term))
            setListOrder(cloneListOrder)
        } else {
            dispatch(fetchAllOrders());
        }
    }, 500)

    return (
        <div className='Order' style={{ padding: '76px 16px 30px' }}>
            <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: '30px' }}>
                <h1 className="m-0">Đơn hàng</h1>
            </div>
            <div className='search'>
                <div className='icon'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <input type='text' placeholder='Tìm kiếm theo tên khách hàng...'
                    onChange={(event) => handleSearch(event)}
                />
            </div>
            <TableOrder
                listOrder={listOrder}
                dataOrderDeleteFromChildToParent={handleDeleteOrder}
            />
            <ModalConfirm
                show={isShowModalConfirm}
                handleClose={handleClose}
                dataOrderDelete={dataOrderDelete}
            />
        </div>
    )
}

export default Order;