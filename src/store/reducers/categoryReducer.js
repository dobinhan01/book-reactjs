import actionTypes from '../actions/actionTypes';

const initialState = {
    categories: [],
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ALL_CATEGORIES_SUCCESS:
            state.categories = action.categories;
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_CATEGORIES_FAILDED:
            state.categories = [];
            return {
                ...state
            }
        default:
            return state;
    }
}

export default categoryReducer;