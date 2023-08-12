import { toast } from 'react-toastify';

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const REMOVE_PRODUCT_TO_CART = 'REMOVE_PRODUCT_TO_CART';
export const CHANGE_PRODUCT_TO_CART = 'CHANGE_PRODUCT_TO_CART';

export const addProductToCart = (product) => {
    return async (dispatch, getState) => {
        dispatch({
            type: ADD_PRODUCT_TO_CART,
            product
        });
        toast.success('Add product to cart successfully')
    }
}

export const removeProductToCart = (product) => {
    return async (dispatch, getState) => {
        dispatch({
            type: REMOVE_PRODUCT_TO_CART,
            product
        });
    }
}

export const changeProductToCart = (product) => {
    return async (dispatch, getState) => {
        dispatch({
            type: CHANGE_PRODUCT_TO_CART,
            product
        });
    }
}