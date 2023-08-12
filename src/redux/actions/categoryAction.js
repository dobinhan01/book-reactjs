import { toast } from 'react-toastify';
import {
    getAllCategories, createCategoryService, updateCategoryService, deleteCategoryService,
    getCategoryHomeService
} from '../../services/CategoryService';

export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';
export const FETCH_CATEGORY_ERROR = 'FETCH_CATEGORY_ERROR';

export const FETCH_CATEGORY_HOME_SUCCESS = 'FETCH_CATEGORY_HOME_SUCCESS';
export const FETCH_CATEGORY_HOME_ERROR = 'FETCH_CATEGORY_HOME_ERROR';

export const fetchAllCategories = () => {
    return async (dispatch, getState) => {
        let res = await getAllCategories();
        if (res?.errCode === 0) {
            dispatch({
                type: FETCH_CATEGORY_SUCCESS,
                data: res.data
            })
        } else {
            dispatch({
                type: FETCH_CATEGORY_ERROR
            })
        }
    }
}

export const createCategory = (payload) => {
    return async (dispatch, getState) => {
        let res = await createCategoryService(payload);
        if (res?.errCode === 0) {
            dispatch(fetchAllCategories())
            toast.success('Create new category success');
        } else {
            toast.error(res.message);
        }
    }
}

export const updateCategory = (id, payload) => {
    return async (dispatch, getState) => {
        let res = await updateCategoryService(id, payload);
        if (res?.errCode === 0) {
            dispatch(fetchAllCategories())
            toast.success('Update category success');
        } else {
            toast.error(res.message);
        }
    }
}

export const deleteCategory = (id) => {
    return async (dispatch, getState) => {
        let res = await deleteCategoryService(id);
        if (res?.errCode === 0) {
            dispatch(fetchAllCategories())
            toast.success('Delete category success');
        } else {
            toast.error(res.message);
        }
    }
}

export const fetchCategoryHome = (limit) => {
    return async (dispatch, getState) => {
        let res = await getCategoryHomeService(limit);
        if (res?.errCode === 0) {
            dispatch({
                type: FETCH_CATEGORY_HOME_SUCCESS,
                data: res.data
            })
        } else {
            dispatch({
                type: FETCH_CATEGORY_HOME_ERROR
            })
        }
    }
}