import {
    FETCH_ALL_REVIEWS_SUCCESS, FETCH_ALL_REVIEWS_ERROR,
    FETCH_REVIEWS_BY_PRODUCT_ID_SUCCESS, FETCH_REVIEWS_BY_PRODUCT_ID_ERROR
} from '../actions/reviewAction'

const INITIAL_STATE = {
    reviews: [],
    reviewsByProductId: []
};

const reviewReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ALL_REVIEWS_SUCCESS:
            return {
                ...state,
                reviews: action.data
            }
        case FETCH_ALL_REVIEWS_ERROR:
            return {
                ...state,
                reviews: []
            }
        case FETCH_REVIEWS_BY_PRODUCT_ID_SUCCESS:
            return {
                ...state,
                reviewsByProductId: action.data
            }
        case FETCH_REVIEWS_BY_PRODUCT_ID_ERROR:
            return {
                ...state,
                reviewsByProductId: []
            }
        default: return state;
    }
}

export default reviewReducer;