import axios from './customize-axios';

const getAllProducts = () => {
    return axios.get(`/api/get-all-products`);
}

const createProductService = (payload) => {
    return axios.post('/api/create-product', payload);
}

const editProductService = (payload) => {
    return axios.put('/api/edit-product', { payload });
}

const deleteProductService = (id) => {
    return axios.delete(`/api/delete-product?id=${id}`);
}

const getProductByIdService = (id) => {
    return axios.get(`/api/get-product-by-id/${id}`);
}

const getProductsService = (category) => {
    return category ? axios.get(`/api/get-products?category=${category}`)
        : axios.get(`/api/get-products`);
}

const getProductsHomeService = (limit) => {
    return axios.get(`/api/get-products-home?limit=${limit}`);
}

const getProductsDiscountService = (limit, discount) => {
    return axios.get(`/api/get-products-discount?limit=${limit}&discount=${discount}`);
}

export {
    getAllProducts, createProductService, editProductService, deleteProductService,
    getProductByIdService, getProductsService, getProductsHomeService, getProductsDiscountService
};