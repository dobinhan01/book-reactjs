
import { toast } from 'react-toastify';
import {
    getAllUsersService, createUserService, editUserService, deleteUserService,
    getAllcode, getUserInfoService, putUserInfoService, getAmountDashboardService
} from '../../services/UserService';

export const FETCH_ALL_USERS = 'FETCH_ALL_USERS';
export const FETCH_ALL_USERS_SUCCESS = 'FETCH_ALL_USERS_SUCCESS';
export const FETCH_ALL_USERS_ERROR = 'FETCH_ALL_USERS_ERROR';

export const FETCH_ALLCODE_SUCCESS = 'FETCH_ALLCODE_SUCCESS';
export const FETCH_ALLCODE_ERROR = 'FETCH_ALLCODE_ERROR';

export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_ERROR = 'GET_USER_INFO_ERROR';

export const GET_AMOUNT_DASHBOARD_SUCCESS = 'GET_AMOUNT_DASHBOARD_SUCCESS';
export const GET_AMOUNT_DASHBOARD_ERROR = 'GET_AMOUNT_DASHBOARD_ERROR';

export const fetchAllUsers = () => {
    return async (dispatch, getState) => {
        dispatch({ type: FETCH_ALL_USERS });
        let res = await getAllUsersService();
        if (res?.errCode === 0) {
            dispatch({
                type: FETCH_ALL_USERS_SUCCESS,
                data: res.data
            })
        } else {
            dispatch({
                type: FETCH_ALL_USERS_ERROR
            })
        }
    }
}

export const createUser = (payload) => {
    return async (dispatch, getState) => {
        let res = await createUserService(payload);
        if (res?.errCode === 0) {
            dispatch(fetchAllUsers());
            toast.success('Create account successfully');
        } else {
            toast.error(res.message);
        }
    }
}

export const editUser = (id, isAdmin) => {
    return async (dispatch, getState) => {
        dispatch({ type: FETCH_ALL_USERS });
        let res = await editUserService(id, isAdmin);
        if (res?.errCode === 0) {
            dispatch(fetchAllUsers());
            toast.success('Edit account successfully');
        } else {
            toast.error(res.message);
        }
    }
}

export const deleteUser = (id) => {
    return async (dispatch, getState) => {
        dispatch({ type: FETCH_ALL_USERS });
        let res = await deleteUserService(id);
        if (res?.errCode === 0) {
            dispatch(fetchAllUsers());
            toast.success('Delete account successfully');
        } else {
            toast.error(res.message);
        }
    }
}

export const fetchAllcode = () => {
    return async (dispatch, getState) => {
        let resStatus = await getAllcode('STATUS');
        let resDiscount = await getAllcode('DISCOUNT');
        let resPayment = await getAllcode('PAYMENT');
        if (resStatus?.errCode === 0
            && resDiscount?.errCode === 0
            && resPayment?.errCode === 0
        ) {
            let data = {
                statuses: resStatus.data,
                discounts: resDiscount.data,
                payments: resPayment.data,
            }
            dispatch({
                type: FETCH_ALLCODE_SUCCESS,
                data
            })
        } else {
            dispatch({
                type: FETCH_ALLCODE_ERROR
            })
        }
    }
}

export const getUserInfo = (id) => {
    return async (dispatch, getState) => {
        let res = await getUserInfoService(id);
        if (res?.errCode === 0) {
            dispatch({
                type: GET_USER_INFO_SUCCESS,
                data: res.data
            })
        } else {
            dispatch({
                type: GET_USER_INFO_ERROR
            })
        }
    }
}

export const putUserInfo = (id, payload) => {
    return async (dispatch, getState) => {
        let res = await putUserInfoService(id, payload);
        if (res?.errCode === 0) {
            toast.success('Update account success');
        } else {
            toast.error(res.message);
        }
    }
}

export const getAmountDashboard = (id) => {
    return async (dispatch, getState) => {
        let res = await getAmountDashboardService(id);
        if (res?.errCode === 0) {
            dispatch({
                type: GET_AMOUNT_DASHBOARD_SUCCESS,
                data: res.data
            })
        } else {
            dispatch({
                type: GET_AMOUNT_DASHBOARD_ERROR
            })
        }
    }
}