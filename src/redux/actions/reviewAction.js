
import { toast } from 'react-toastify';
import {
    getAllReviewsService, creatReviewService,
    getReviewsByProductIdService
} from '../../services/ReviewService';

export const FETCH_ALL_REVIEWS_SUCCESS = 'FETCH_ALL_REVIEWS_SUCCESS';
export const FETCH_ALL_REVIEWS_ERROR = 'FETCH_ALL_REVIEWS_ERROR';

export const FETCH_REVIEWS_BY_PRODUCT_ID_SUCCESS = 'FETCH_REVIEWS_BY_PRODUCT_ID_SUCCESS';
export const FETCH_REVIEWS_BY_PRODUCT_ID_ERROR = 'FETCH_REVIEWS_BY_PRODUCT_ID_ERROR';

export const fetchAllReviews = () => {
    return async (dispatch, getState) => {
        let res = await getAllReviewsService();
        if (res?.errCode === 0) {
            dispatch({
                type: FETCH_ALL_REVIEWS_SUCCESS,
                data: res.data
            })
        } else {
            dispatch({
                type: FETCH_ALL_REVIEWS_ERROR
            })
        }
    }
}

export const creatReview = (payload) => {
    return async (dispatch, getState) => {
        let res = await creatReviewService(payload);
        if (res?.errCode === 0) {
            toast.success('Review submitted successfully');
            dispatch(fetchReviewsByProductId(payload.productId));
        } else {
            toast.error(res.message)
        }
    }
}

// export const deleteContact = (id) => {
//     return async (dispatch, getState) => {
//         let res = await deleteContactService(id);
//         if (res?.errCode === 0) {
//             toast.success('Question deleted successfully');
//             dispatch(fetchAllContacts());
//         } else {
//             toast.error(res.message)
//         }
//     }
// }

export const fetchReviewsByProductId = (id) => {
    return async (dispatch, getState) => {
        let res = await getReviewsByProductIdService(id);
        if (res?.errCode === 0) {
            dispatch({
                type: FETCH_REVIEWS_BY_PRODUCT_ID_SUCCESS,
                data: res.data
            })
        } else {
            dispatch({
                type: FETCH_REVIEWS_BY_PRODUCT_ID_ERROR
            })
        }
    }
}