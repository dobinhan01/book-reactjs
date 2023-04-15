import actionTypes from '../actions/actionTypes';

const initialState = {
    discounts: [],
    books: [],
    flashSaleHome: [],
}

const bookReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_DISCOUNT_SUCCESS:
            state.discounts = action.data;
            return {
                ...state
            }

        case actionTypes.FETCH_DISCOUNT_FAILDED:
            state.discounts = [];
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_BOOKS_SUCCESS:
            state.books = action.books;
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_BOOKS_FAILDED:
            state.books = [];
            return {
                ...state
            }

        case actionTypes.FETCH_FLASH_SALE_HOME_SUCCESS:
            state.flashSaleHome = action.dataFlashSale;
            return {
                ...state
            }

        case actionTypes.FETCH_FLASH_SALE_HOME_FAILDED:
            state.flashSaleHome = [];
            return {
                ...state
            }
        default:
            return state;
    }
}

export default bookReducer;