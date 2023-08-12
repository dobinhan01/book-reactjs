import {
    LOGIN, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT,
    GET_CURRENT_USER, GET_CURRENT_USER_SUCCESS, GET_CURRENT_USER_ERROR
} from '../actions/authAction'

const INITIAL_STATE = {
    currentUser: null,
    token: null,
    isLoggedIn: false,
    isLoading: false,
    isError: false
};

const authReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.data,
                isLoggedIn: true,
                isLoading: false,
                isError: false
            }
        case LOGIN_ERROR:
            return {
                ...state,
                isLoggedIn: false,
                isLoading: false,
                isError: true
            }
        case LOGOUT:
            return {
                ...state,
                currentUser: null,
                token: null,
                isLoggedIn: false
            }
        case GET_CURRENT_USER:
            return {
                ...state
            }
        case GET_CURRENT_USER_SUCCESS:
            return {
                ...state,
                currentUser: action.data
            }
        case GET_CURRENT_USER_ERROR:
            return {
                ...state,
                currentUser: null
            }
        default: return state;
    }
}

export default authReducer;