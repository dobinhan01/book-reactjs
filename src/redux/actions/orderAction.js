import { toast } from 'react-toastify';
import {
    getAllOrdersService, createOrderService, editOrderService, deleteOrderService,
    getLatestOrdersService, getOrdersByUserIdService, getOrderDetailByIdService, getOrderDetailByProductIdService
} from '../../services/OrderService';

export const FETCH_ALL_ORDERS_SUCCESS = 'FETCH_ALL_ORDERS_SUCCESS';
export const FETCH_ALL_ORDERS_ERROR = 'FETCH_ALL_ORDERS_ERROR';

export const CREATE_ORDER = 'CREATE_ORDER';

export const FETCH_LATEST_ORDERS_SUCCESS = 'FETCH_LATEST_ORDERS_SUCCESS';
export const FETCH_LATEST_ORDERS_ERROR = 'FETCH_LATEST_ORDERS_ERROR';

export const FETCH__ORDERS_BY_USER_ID_SUCCESS = 'FETCH__ORDERS_BY_USER_ID_SUCCESS';
export const FETCH__ORDERS_BY_USER_ID_ERROR = 'FETCH__ORDERS_BY_USER_ID_ERROR';

export const FETCH__ORDER_DETAIL_BY_ID_SUCCESS = 'FETCH__ORDER_DETAIL_BY_ID_SUCCESS';
export const FETCH__ORDER_DETAIL_BY_ID_ERROR = 'FETCH__ORDER_DETAIL_BY_ID_ERROR';

export const FETCH__ORDER_DETAIL_BY_PRODUCT_ID_SUCCESS = 'FETCH__ORDER_DETAIL_BY_PRODUCT_ID_SUCCESS';
export const FETCH__ORDER_DETAIL_BY_PRODUCT_ID_ERROR = 'FETCH__ORDER_DETAIL_BY_PRODUCT_ID_ERROR';

export const fetchAllOrders = () => {
    return async (dispatch, getState) => {
        let res = await getAllOrdersService();
        if (res?.errCode === 0) {
            dispatch({
                type: FETCH_ALL_ORDERS_SUCCESS,
                data: res.data
            })
        } else {
            dispatch({
                type: FETCH_ALL_ORDERS_ERROR
            })
        }
    }
}

export const createOrder = (payload, navigate) => {
    return async (dispatch, getState) => {
        let res = await createOrderService(payload);
        if (res?.errCode === 0) {
            toast.success('You have successfully placed your order');
            navigate(`/order/${res.orderId}`)
        } else {
            toast.error(res.message);
        }
    }
}

export const updateOrder = (id, status) => {
    return async (dispatch, getState) => {
        let res = await editOrderService(id, status);
        if (res?.errCode === 0) {
            dispatch(fetchAllOrders());
            toast.success('Update order success');
        } else {
            toast.error(res.message);
        }
    }
}

export const deleteOrder = (id) => {
    return async (dispatch, getState) => {
        let res = await deleteOrderService(id);
        if (res?.errCode === 0) {
            dispatch(fetchAllOrders());
            toast.success('Delete order success');
        } else {
            toast.error(res.message);
        }
    }
}

export const fetchLatestOrders = () => {
    return async (dispatch, getState) => {
        let res = await getLatestOrdersService();
        if (res?.errCode === 0) {
            dispatch({
                type: FETCH_LATEST_ORDERS_SUCCESS,
                data: res.data
            })
        } else {
            dispatch({
                type: FETCH_LATEST_ORDERS_ERROR
            })
        }
    }
}

export const fetchOrdersByUserId = (id) => {
    return async (dispatch, getState) => {
        let res = await getOrdersByUserIdService(id);
        if (res?.errCode === 0) {
            dispatch({
                type: FETCH__ORDERS_BY_USER_ID_SUCCESS,
                data: res.data
            })
        } else {
            dispatch({
                type: FETCH__ORDERS_BY_USER_ID_ERROR
            })
        }
    }
}

export const fetchOrderDetailById = (id) => {
    return async (dispatch, getState) => {
        let res = await getOrderDetailByIdService(id);
        if (res?.errCode === 0) {
            dispatch({
                type: FETCH__ORDER_DETAIL_BY_ID_SUCCESS,
                data: res.data
            })
        } else {
            dispatch({
                type: FETCH__ORDER_DETAIL_BY_ID_ERROR
            })
        }
    }
}

export const fetchOrderDetailByProductId = (id) => {
    return async (dispatch, getState) => {
        let res = await getOrderDetailByProductIdService(id);
        if (res?.errCode === 0) {
            dispatch({
                type: FETCH__ORDER_DETAIL_BY_PRODUCT_ID_SUCCESS,
                data: res.data
            })
        } else {
            dispatch({
                type: FETCH__ORDER_DETAIL_BY_PRODUCT_ID_ERROR
            })
        }
    }
}