import { toast } from 'react-toastify';
import {
    getAllProducts, createProductService, editProductService, deleteProductService,
    getProductByIdService, getProductsService, getProductsHomeService, getProductsDiscountService
} from '../../services/ProductService';

export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCT_ERROR';

export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';
export const CREATE_PRODUCT_ERROR = 'CREATE_PRODUCT_ERROR';

export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS';
export const EDIT_PRODUCT_ERROR = 'EDIT_PRODUCT_ERROR';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_ERROR = 'DELETE_PRODUCT_ERROR';

export const GET_PRODUCT_BY_ID_SUCCESS = 'GET_PRODUCT_BY_ID_SUCCESS';
export const GET_PRODUCT_BY_ID_ERROR = 'GET_PRODUCT_BY_ID_ERROR';

export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_ERROR = 'GET_PRODUCTS_ERROR';

export const GET_PRODUCTS_HOME_SUCCESS = 'GET_PRODUCTS_HOME_SUCCESS';
export const GET_PRODUCTS_HOME_ERROR = 'GET_PRODUCTS_HOME_ERROR';

export const GET_PRODUCTS_DISCOUNT_SUCCESS = 'GET_PRODUCTS_DISCOUNT_SUCCESS';
export const GET_PRODUCTS_DISCOUNT_ERROR = 'GET_PRODUCTS_DISCOUNT_ERROR';

export const fetchAllProducts = () => {
    return async (dispatch, getState) => {
        let res = await getAllProducts();
        if (res?.errCode === 0) {
            dispatch({
                type: FETCH_PRODUCTS_SUCCESS,
                data: res.data
            })
        } else {
            dispatch({
                type: FETCH_PRODUCTS_ERROR
            })
        }
    }
}

export const createProduct = (payload) => {
    return async (dispatch, getState) => {
        let res = await createProductService(payload);
        if (res?.errCode === 0) {
            dispatch(fetchAllProducts());
            toast.success('Product is created success!');
        } else {
            toast.error(res.message)
        }
    }
}

export const editProduct = (payload) => {
    return async (dispatch, getState) => {
        let res = await editProductService(payload);
        if (res?.errCode === 0) {
            dispatch(fetchAllProducts());
            toast.success('Product is edited success!');
        } else {
            toast.error(res.message)
        }
    }
}

export const deleteProduct = (id) => {
    return async (dispatch, getState) => {
        let res = await deleteProductService(id);
        if (res?.errCode === 0) {
            dispatch(fetchAllProducts());
            toast.success('Product is deleted success!');
        } else {
            toast.error(res.message)
        }
    }
}

export const getProductById = (id) => {
    return async (dispatch, getState) => {
        let res = await getProductByIdService(id);
        if (res?.errCode === 0) {
            dispatch({
                type: GET_PRODUCT_BY_ID_SUCCESS,
                data: res.data
            })
        } else {
            dispatch({ type: GET_PRODUCT_BY_ID_ERROR })
        }
    }
}

export const getProducts = (category) => {
    return async (dispatch, getState) => {
        let res = await getProductsService(category);
        if (res?.errCode === 0) {
            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                data: res.data
            })
        } else {
            dispatch({ type: GET_PRODUCTS_ERROR })
        }
    }
}

export const getProductsHome = (limit) => {
    return async (dispatch, getState) => {
        let res = await getProductsHomeService(limit);
        if (res?.errCode === 0) {
            dispatch({
                type: GET_PRODUCTS_HOME_SUCCESS,
                data: res.data
            })
        } else {
            dispatch({ type: GET_PRODUCTS_HOME_ERROR })
        }
    }
}

export const getProductsDiscount = (limit, discount) => {
    return async (dispatch, getState) => {
        let res = await getProductsDiscountService(limit, discount);
        if (res?.errCode === 0) {
            dispatch({
                type: GET_PRODUCTS_DISCOUNT_SUCCESS,
                data: res.data
            })
        } else {
            dispatch({ type: GET_PRODUCTS_DISCOUNT_ERROR })
        }
    }
}