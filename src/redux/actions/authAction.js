import { toast } from 'react-toastify';
import { loginService, loginAdminService, registerService, getCurrentUserService } from '../../services/AuthService';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const LOGOUT = 'LOGOUT';

export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const GET_CURRENT_USER_SUCCESS = 'GET_CURRENT_USER_SUCCESS';
export const GET_CURRENT_USER_ERROR = 'GET_CURRENT_USER_ERROR';

export const login = (email, password) => {
    return async (dispatch, getState) => {
        dispatch({ type: LOGIN });
        let res = await loginService(email, password);
        if (res?.errCode === 0) {
            dispatch({
                type: LOGIN_SUCCESS,
                data: res.token
            })
        } else {
            toast.error(res.message);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }
}

export const loginAmin = (email, password) => {
    return async (dispatch, getState) => {
        dispatch({ type: LOGIN });
        let res = await loginAdminService(email, password);
        if (res?.errCode === 0) {
            dispatch({
                type: LOGIN_SUCCESS,
                data: res.token
            })
        } else {
            toast.error(res.message);
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }
}

export const register = (username, email, password, navigate) => {
    return async (dispatch, getState) => {
        let res = await registerService(username.trim(), email, password);
        if (res?.errCode === 0) {
            toast.success('Tạo tài khoản thành công');
            navigate('/login');
        } else {
            toast.error(res.message);
        }
    }
}

export const logout = () => {
    return async (dispatch, getState) => {
        toast.success('Đăng suất thành công');
        dispatch({ type: LOGOUT });
    }
}

export const getCurrentUser = () => {
    return async (dispatch, getState) => {
        dispatch({ type: GET_CURRENT_USER });
        let res = await getCurrentUserService();
        if (res?.errCode === 0) {
            dispatch({
                type: GET_CURRENT_USER_SUCCESS,
                data: res.data
            })
        } else {
            dispatch({
                type: GET_CURRENT_USER_ERROR
            })
        }
    }
}