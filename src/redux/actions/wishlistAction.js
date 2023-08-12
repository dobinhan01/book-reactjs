import { getAllWishlistsByUserIdService, createWishlistService, deleteWishlistService } from '../../services/WishlistService';
import { toast } from 'react-toastify';

export const FETCH_ALL_WISHLISTS_BY_USER_ID_SUCCESS = 'FETCH_ALL_WISHLISTS_BY_USER_ID_SUCCESS';
export const FETCH_ALL_WISHLISTS_BY_USER_ID_ERROR = 'FETCH_ALL_WISHLISTS_BY_USER_ID_ERROR';

export const fecthAllWishlistsByUserId = (id) => {
    return async (dispatch, getState) => {
        let res = await getAllWishlistsByUserIdService(id);
        if (res?.errCode === 0) {
            dispatch({
                type: FETCH_ALL_WISHLISTS_BY_USER_ID_SUCCESS,
                data: res.data
            })
        } else {
            dispatch({
                type: FETCH_ALL_WISHLISTS_BY_USER_ID_ERROR
            })
        }
    }
}

export const createWishlist = (payload) => {
    return async (dispatch, getState) => {
        let res = await createWishlistService(payload);
        if (res?.errCode === 0) {
            toast.success('Add product to wishlist successfully');
            dispatch(fecthAllWishlistsByUserId(payload.userId));
        } else {
            toast.error(res.message)
        }
    }
}

export const deleteWishlist = (payload) => {
    return async (dispatch, getState) => {
        let res = await deleteWishlistService(payload);
        if (res?.errCode === 0) {
            toast.success('Removed product successfully');
            dispatch(fecthAllWishlistsByUserId(payload.userId));
        } else {
            toast.error(res.message)
        }
    }
}