import axios from './customize-axios';

const getAllWishlistsByUserIdService = (id) => {
    return axios.get(`/api/get-all-wishlists-by-user-id/${id}`);
}

const createWishlistService = (payload) => {
    return axios.post('/api/create-wishlist', payload);
}

const deleteWishlistService = (payload) => {
    return axios.delete('/api/delete-wishlist', { data: payload });
}

export {
    getAllWishlistsByUserIdService, createWishlistService, deleteWishlistService
};