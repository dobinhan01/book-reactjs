import actionTypes from './actionTypes';
import {
    createNewCategoryService, getAllCategories,
    deleteCategoryService, editCategoryService, getCategoryHome
} from '../../services/categoryService';
import { toast } from 'react-toastify';

export const createNewCategory = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewCategoryService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new category succeed!");
                dispatch(saveCategorySuccess());
                dispatch(fetchAllCategories());
            } else {
                alert(res.errMessage)
                dispatch(saveCategoryFailed());
            }
        } catch (e) {
            dispatch(saveCategoryFailed());
            console.log(e)
        }
    }
}

export const saveCategorySuccess = () => ({
    type: actionTypes.CREATE_CATEGORY_SUCCESS
})

export const saveCategoryFailed = () => ({
    type: actionTypes.CREATE_CATEGORY_FAILDED
})

export const fetchAllCategories = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCategories();
            if (res && res.errCode === 0) {
                dispatch(fetchAllCategoriesSuccess(res.categories.reverse()));
            } else {
                dispatch(fetchAllCategoriesFailed());
            }
        } catch (e) {
            dispatch(fetchAllCategoriesFailed());
            console.log(e)
        }
    }
}

export const fetchAllCategoriesSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CATEGORIES_SUCCESS,
    categories: data
})

export const fetchAllCategoriesFailed = () => ({
    type: actionTypes.FETCH_ALL_CATEGORIES_FAILDED
})

export const deleteACategory = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteCategoryService(id);
            if (res && res.errCode === 0) {
                toast.success('Delete the category successed!')
                dispatch(deleteCategorySuccess());
                dispatch(fetchAllCategories());
            } else {
                dispatch(deleteCategoryFailed());
            }
        } catch (e) {
            dispatch(deleteCategoryFailed());
            console.log(e)
        }
    }
}

export const deleteCategorySuccess = () => ({
    type: actionTypes.DELETE_CATEGORY_SUCCESS
})

export const deleteCategoryFailed = () => ({
    type: actionTypes.DELETE_CATEGORY_FAILDED
})

export const editACategory = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editCategoryService(data);
            if (res && res.errCode === 0) {
                toast.success('Update the category successed!')
                dispatch(editCategorySuccess());
                dispatch(fetchAllCategories());
            } else {
                dispatch(editCategoryFailed());
            }
        } catch (e) {
            dispatch(editCategoryFailed());
            console.log(e)
        }
    }
}

export const editCategorySuccess = () => ({
    type: actionTypes.EDIT_CATEGORY_SUCCESS
})

export const editCategoryFailed = () => ({
    type: actionTypes.EDIT_CATEGORY_FAILDED
})

export const fetchCategoryHome = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getCategoryHome('');
            if (res && res.errCode === 0) {
                dispatch(fetchCategoriesHomeSuccess(res.data));
            } else {
                dispatch(fetchCategoriesHomeFailed());
            }
        } catch (e) {
            dispatch(fetchCategoriesHomeFailed());
            console.log(e)
        }
    }
}

export const fetchCategoriesHomeSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_CATEGORIES_HOME_SUCCESS,
    dataCategories: data
})

export const fetchCategoriesHomeFailed = () => ({
    type: actionTypes.FETCH_ALL_CATEGORIES_HOME_FAILDED
})
