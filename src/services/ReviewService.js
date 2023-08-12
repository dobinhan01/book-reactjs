import axios from './customize-axios';

const getAllReviewsService = () => {
    return axios.get('/api/get-all-reviews');
}

const creatReviewService = (payload) => {
    return axios.post('/api/create-review', payload);
}

const deleteReviewService = (id) => {
    return axios.delete(`/api/delete-review/${id}`);
}

const getReviewsByProductIdService = (id) => {
    return axios.get(`/api/get-reviews-by-product-id/${id}`);
}

export {
    getAllReviewsService, creatReviewService, deleteReviewService, getReviewsByProductIdService
};