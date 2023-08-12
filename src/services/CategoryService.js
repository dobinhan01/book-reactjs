import axios from './customize-axios';

const getAllCategories = () => {
    return axios.get('/api/get-all-categories');
}

const createCategoryService = (payload) => {
    return axios.post('/api/create-category', payload);
}

const updateCategoryService = (id, payload) => {
    return axios.put(`/api/edit-category/${id}`, payload);
}

const deleteCategoryService = (id) => {
    return axios.delete(`/api/delete-category/${id}`);
}

const getCategoryHomeService = (limit) => {
    return axios.get(`/api/get-category-home?limit=${limit}`);
}

export {
    getAllCategories, createCategoryService, updateCategoryService, deleteCategoryService,
    getCategoryHomeService
};