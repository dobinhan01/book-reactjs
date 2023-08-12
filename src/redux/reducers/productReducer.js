import {
    FETCH_PRODUCTS_SUCCESS, FETCH_PRODUCTS_ERROR, GET_PRODUCT_BY_ID_SUCCESS, GET_PRODUCT_BY_ID_ERROR,
    GET_PRODUCTS_SUCCESS, GET_PRODUCTS_ERROR, GET_PRODUCTS_HOME_SUCCESS, GET_PRODUCTS_HOME_ERROR,
    GET_PRODUCTS_DISCOUNT_SUCCESS, GET_PRODUCTS_DISCOUNT_ERROR
} from '../actions/productAction'

const INITIAL_STATE = {
    products: [],
    product: null,
    productsByCategory: [],
    productsHome: [],
    productsDiscount: []
};

const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.data
            }
        case FETCH_PRODUCTS_ERROR:
            return {
                ...state,
                product: []
            }
        case GET_PRODUCT_BY_ID_SUCCESS:
            return {
                ...state,
                product: action.data
            }
        case GET_PRODUCT_BY_ID_ERROR:
            return {
                ...state,
                product: null
            }
        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                productsByCategory: action.data
            }
        case GET_PRODUCTS_ERROR:
            return {
                ...state,
                productsByCategory: null
            }
        case GET_PRODUCTS_HOME_SUCCESS:
            return {
                ...state,
                productsHome: action.data
            }
        case GET_PRODUCTS_HOME_ERROR:
            return {
                ...state,
                productsHome: null
            }
        case GET_PRODUCTS_DISCOUNT_SUCCESS:
            return {
                ...state,
                productsDiscount: action.data
            }
        case GET_PRODUCTS_DISCOUNT_ERROR:
            return {
                ...state,
                productsDiscount: null
            }
        default: return state;
    }
}

export default productReducer;