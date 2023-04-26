import actionTypes from './actionTypes';
import { getAllCartsByUserId } from '../../services/customerService';
import { toast } from 'react-toastify';

export const fetchAllCartsByUserId = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCartsByUserId(id);
            if (res && res.errCode === 0) {
                dispatch(fetchAllCartsByUserIdSuccess(res.data));
            } else {
                dispatch(fetchAllCartsByUserIdFailed());
            }
        } catch (e) {
            dispatch(fetchAllCartsByUserIdFailed());
            console.log(e)
        }
    }
}

export const fetchAllCartsByUserIdSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CARTS_BY_USER_ID_SUCCESS,
    data: data
})

export const fetchAllCartsByUserIdFailed = () => ({
    type: actionTypes.FETCH_ALL_CARTS_BY_USER_ID_FAILDED
})
