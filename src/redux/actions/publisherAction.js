import { toast } from 'react-toastify';
import { getAllPublishers, createPublisherService, updatePublisherService, deletePublisherService } from '../../services/PublisherService';

export const FETCH_PUBLISHER = 'FETCH_PUBLISHER';
export const FETCH_PUBLISHER_SUCCESS = 'FETCH_PUBLISHER_SUCCESS';
export const FETCH_PUBLISHER_ERROR = 'FETCH_PUBLISHER_ERROR';

export const fetchAllPublishers = () => {
    return async (dispatch, getState) => {
        dispatch({ type: FETCH_PUBLISHER });
        let res = await getAllPublishers();
        if (res?.errCode === 0) {
            dispatch({
                type: FETCH_PUBLISHER_SUCCESS,
                data: res.data
            })
        } else {
            dispatch({
                type: FETCH_PUBLISHER_ERROR
            })
        }
    }
}

export const createPublisher = (payload) => {
    return async (dispatch, getState) => {
        let res = await createPublisherService(payload);
        if (res?.errCode === 0) {
            dispatch(fetchAllPublishers());
            toast.success('Create new publisher success');
        } else {
            toast.error(res.message);
        }
    }
}

export const updatePublisher = (id, payload) => {
    return async (dispatch, getState) => {
        let res = await updatePublisherService(id, payload);
        if (res?.errCode === 0) {
            dispatch(fetchAllPublishers());
            toast.success('Update publisher success');
        } else {
            toast.error(res.message);
        }
    }
}

export const deletePublisher = (id) => {
    return async (dispatch, getState) => {
        let res = await deletePublisherService(id);
        if (res?.errCode === 0) {
            dispatch(fetchAllPublishers());
            toast.success('Delete publisher success');
        } else {
            toast.error(res.message);
        }
    }
}