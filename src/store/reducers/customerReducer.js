import actionTypes from '../actions/actionTypes';

const initialState = {
    carts: [],
}

const customerReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_ALL_CARTS_BY_USER_ID_SUCCESS:
            state.carts = action.data;
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_CARTS_BY_USER_ID_FAILDEDs:
            state.carts = [];
            return {
                ...state
            }

        default:
            return state;
    }
}

export default customerReducer;