import actionTypes from './actionTypes';
import {
    createNewBookService, getAllBooks,
    deleteBookService, editBookService, getFlashSaleHome, getAllCodeService
} from '../../services/bookService';
import { toast } from 'react-toastify';

export const fetchDiscountStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService('DISCOUNT');
            if (res && res.errCode === 0) {
                dispatch(fetchDiscountSuccess(res.data));
            } else {
                dispatch(fetchDiscountFailed());
            }
        } catch (e) {
            dispatch(fetchDiscountFailed());
            console.log(e)
        }
    }
}

export const fetchDiscountSuccess = (roleData) => ({
    type: actionTypes.FETCH_DISCOUNT_SUCCESS,
    data: roleData
})

export const fetchDiscountFailed = () => ({
    type: actionTypes.FETCH_DISCOUNT_FAILDED
})

export const createNewBook = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewBookService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new category succeed!");
                dispatch(saveBookSuccess());
                dispatch(fetchAllBooks());
            } else {
                alert(res.errMessage)
                dispatch(saveBookFailed());
            }
        } catch (e) {
            dispatch(saveBookFailed());
            console.log(e)
        }
    }
}

export const saveBookSuccess = () => ({
    type: actionTypes.CREATE_BOOK_SUCCESS
})

export const saveBookFailed = () => ({
    type: actionTypes.CREATE_BOOK_FAILDED
})

export const fetchAllBooks = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllBooks();
            if (res && res.errCode === 0) {
                dispatch(fetchAllBooksSuccess(res.data.reverse()));
            } else {
                dispatch(fetchAllBooksFailed());
            }
        } catch (e) {
            dispatch(fetchAllBooksFailed());
            console.log(e)
        }
    }
}

export const fetchAllBooksSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_BOOKS_SUCCESS,
    books: data
})

export const fetchAllBooksFailed = () => ({
    type: actionTypes.FETCH_ALL_BOOKS_FAILDED
})

export const deleteABook = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteBookService(id);
            if (res && res.errCode === 0) {
                toast.success('Delete the book successed!')
                dispatch(deleteBookSuccess());
                dispatch(fetchAllBooks());
            } else {
                dispatch(deleteBookFailed());
            }
        } catch (e) {
            dispatch(deleteBookFailed());
            console.log(e)
        }
    }
}

export const deleteBookSuccess = () => ({
    type: actionTypes.DELETE_BOOK_SUCCESS
})

export const deleteBookFailed = () => ({
    type: actionTypes.DELETE_BOOK_FAILDED
})

export const editABook = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editBookService(data);
            if (res && res.errCode === 0) {
                toast.success('Update the book successed!')
                dispatch(editBookSuccess());
                dispatch(fetchAllBooks());
            } else {
                dispatch(editBookFailed());
            }
        } catch (e) {
            dispatch(editBookFailed());
            console.log(e)
        }
    }
}

export const editBookSuccess = () => ({
    type: actionTypes.EDIT_BOOK_SUCCESS
})

export const editBookFailed = () => ({
    type: actionTypes.EDIT_BOOK_FAILDED
})

export const fetchFlashSaleHome = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getFlashSaleHome('');
            if (res && res.errCode === 0) {
                dispatch(fetchFlashSaleHomeSuccess(res.data));
            } else {
                dispatch(fetchFlashSaleHomeFailed());
            }
        } catch (e) {
            dispatch(fetchFlashSaleHomeFailed());
            console.log(e)
        }
    }
}

export const fetchFlashSaleHomeSuccess = (data) => ({
    type: actionTypes.FETCH_FLASH_SALE_HOME_SUCCESS,
    dataFlashSale: data
})

export const fetchFlashSaleHomeFailed = () => ({
    type: actionTypes.FETCH_FLASH_SALE_HOME_FAILDED
})