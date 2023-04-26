import axios from "../axios";

const postAddBookToCart = (data) => {
    return axios.post('/api/customer-add-to-cart', data);
}

const getAllCartsByUserId = (id) => {
    return axios.get(`/api/get-all-carts-by-user-id?id=${id}`);
}

const updateCartByUserId = (data) => {
    return axios.put(`/api/update-cart-by-user-id`, data);
}

export {
    postAddBookToCart, getAllCartsByUserId, updateCartByUserId
}