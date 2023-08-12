import { FETCH_ALL_WISHLISTS_BY_USER_ID_SUCCESS, FETCH_ALL_WISHLISTS_BY_USER_ID_ERROR } from '../actions/wishlistAction';

const INITIAL_STATE = {
    wishlistsByUserId: []
};

const wishlistReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ALL_WISHLISTS_BY_USER_ID_SUCCESS:
            return {
                ...state,
                wishlistsByUserId: action.data
            }
        case FETCH_ALL_WISHLISTS_BY_USER_ID_ERROR:
            return {
                ...state,
                wishlistsByUserId: []
            }
        default: return state;
    }
}

export default wishlistReducer;