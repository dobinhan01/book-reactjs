import axios from './customize-axios';

const getAllOrdersService = () => {
    return axios.get('/api/get-all-orders');
}

const createOrderService = (payload) => {
    return axios.post('/api/create-order', payload);
}

const editOrderService = (id, status) => {
    return axios.put(`/api/edit-order/${id}`, { status });
}

const deleteOrderService = (id) => {
    return axios.delete(`/api/delete-order/${id}`);
}

const getLatestOrdersService = () => {
    return axios.get('/api/get-latest-orders');
}

const getOrdersByUserIdService = (id) => {
    return axios.get(`/api/get-orders-by-user-id/${id}`);
}

const getOrderDetailByIdService = (id) => {
    return axios.get(`/api/get-order-detail-by-id/${id}`);
}

const getOrderDetailByProductIdService = (id) => {
    return axios.get(`/api/get-order-detail-by-product-id/${id}`);
}

export {
    getAllOrdersService, createOrderService, editOrderService, deleteOrderService,
    getLatestOrdersService, getOrdersByUserIdService, getOrderDetailByIdService, getOrderDetailByProductIdService
};