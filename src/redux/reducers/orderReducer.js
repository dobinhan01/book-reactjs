import {
    FETCH_ALL_ORDERS_SUCCESS, FETCH_ALL_ORDERS_ERROR, CREATE_ORDER,
    FETCH_LATEST_ORDERS_SUCCESS, FETCH_LATEST_ORDERS_ERROR,
    FETCH__ORDERS_BY_USER_ID_SUCCESS, FETCH__ORDERS_BY_USER_ID_ERROR,
    FETCH__ORDER_DETAIL_BY_ID_SUCCESS, FETCH__ORDER_DETAIL_BY_ID_ERROR,
    FETCH__ORDER_DETAIL_BY_PRODUCT_ID_SUCCESS, FETCH__ORDER_DETAIL_BY_PRODUCT_ID_ERROR
} from '../actions/orderAction'

const INITIAL_STATE = {
    orders: [],
    orderId: null,
    latestOrders: [],
    ordersByUserId: [],
    orderDetails: [],
    orderDetailsByProductId: []
};

const orderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ALL_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.data
            }
        case FETCH_ALL_ORDERS_ERROR:
            return {
                ...state,
                orders: []
            }
        case CREATE_ORDER:
            return {
                ...state,
                orderId: action.orderId
            }
        case FETCH_LATEST_ORDERS_SUCCESS:
            return {
                ...state,
                latestOrders: action.data
            }
        case FETCH_LATEST_ORDERS_ERROR:
            return {
                ...state,
                latestOrders: []
            }
        case FETCH__ORDERS_BY_USER_ID_SUCCESS:
            return {
                ...state,
                ordersByUserId: action.data
            }
        case FETCH__ORDERS_BY_USER_ID_ERROR:
            return {
                ...state,
                ordersByUserId: []
            }
        case FETCH__ORDER_DETAIL_BY_ID_SUCCESS:
            return {
                ...state,
                orderDetails: action.data
            }
        case FETCH__ORDER_DETAIL_BY_ID_ERROR:
            return {
                ...state,
                orderDetails: []
            }
        case FETCH__ORDER_DETAIL_BY_PRODUCT_ID_SUCCESS:
            return {
                ...state,
                orderDetailsByProductId: action.data
            }
        case FETCH__ORDER_DETAIL_BY_PRODUCT_ID_ERROR:
            return {
                ...state,
                orderDetailsByProductId: []
            }
        default: return state;
    }
}

export default orderReducer;