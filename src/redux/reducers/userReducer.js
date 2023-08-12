import {
    FETCH_ALL_USERS, FETCH_ALL_USERS_SUCCESS, FETCH_ALL_USERS_ERROR,
    FETCH_ALLCODE_SUCCESS, FETCH_ALLCODE_ERROR,
    GET_USER_INFO_SUCCESS, GET_USER_INFO_ERROR,
    GET_AMOUNT_DASHBOARD_SUCCESS, GET_AMOUNT_DASHBOARD_ERROR
} from '../actions/userAction'

const INITIAL_STATE = {
    users: [],
    allcodes: [],
    userInfo: {},
    amountDashboard: {}
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ALL_USERS:
            return {
                ...state
            }
        case FETCH_ALL_USERS_SUCCESS:
            return {
                ...state,
                users: action.data
            }
        case FETCH_ALL_USERS_ERROR:
            return {
                ...state,
                users: []
            }
        case FETCH_ALLCODE_SUCCESS:
            return {
                ...state,
                allcodes: action.data
            }
        case FETCH_ALLCODE_ERROR:
            return {
                ...state,
                allcodes: []
            }
        case GET_USER_INFO_SUCCESS:
            return {
                ...state,
                userInfo: action.data
            }
        case GET_USER_INFO_ERROR:
            return {
                ...state,
                userInfo: {}
            }
        case GET_AMOUNT_DASHBOARD_SUCCESS:
            return {
                ...state,
                amountDashboard: action.data
            }
        case GET_AMOUNT_DASHBOARD_ERROR:
            return {
                ...state,
                amountDashboard: {}
            }
        default: return state;
    }
}

export default userReducer;