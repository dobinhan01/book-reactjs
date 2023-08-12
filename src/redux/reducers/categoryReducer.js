import {
    FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_ERROR,
    FETCH_CATEGORY_HOME_SUCCESS, FETCH_CATEGORY_HOME_ERROR
} from '../actions/categoryAction'

const INITIAL_STATE = {
    categories: [],
    categoryHome: []
};

const categoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: action.data
            }
        case FETCH_CATEGORY_ERROR:
            return {
                ...state,
                categories: []
            }
        case FETCH_CATEGORY_HOME_SUCCESS:
            return {
                ...state,
                categoryHome: action.data
            }
        case FETCH_CATEGORY_HOME_ERROR:
            return {
                ...state,
                categoryHome: []
            }
        default: return state;
    }
}

export default categoryReducer;