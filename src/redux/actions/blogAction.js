import { toast } from 'react-toastify';
import {
    getAllBlogsService, createBlogService, updateBlogService, deleteBlogService,
    getBlogByIdService
} from '../../services/BlogService';

export const FETCH_ALL_BLOGS_SUCCESS = 'FETCH_ALL_BLOGS_SUCCESS';
export const FETCH_ALL_BLOGS_ERROR = 'FETCH_ALL_BLOGS_ERROR';

export const FETCH_BLOG_BY_ID_SUCCESS = 'FETCH_BLOG_BY_ID_SUCCESS';
export const FETCH_BLOG_BY_ID_ERROR = 'FETCH_BLOG_BY_ID_ERROR';

export const fetchAllBlogs = () => {
    return async (dispatch, getState) => {
        let res = await getAllBlogsService();
        if (res?.errCode === 0) {
            dispatch({
                type: FETCH_ALL_BLOGS_SUCCESS,
                data: res.data
            })
        } else {
            dispatch({
                type: FETCH_ALL_BLOGS_ERROR
            })
        }
    }
}

export const createBlog = (payload, navigate) => {
    return async (dispatch, getState) => {
        let res = await createBlogService(payload);
        if (res?.errCode === 0) {
            dispatch(fetchAllBlogs());
            navigate('/admin/blog');
            toast.success('Create new blog successfully');
        } else {
            toast.error(res.message);
        }
    }
}

export const updateBlog = (id, payload, navigate) => {
    return async (dispatch, getState) => {
        let res = await updateBlogService(id, payload);
        if (res?.errCode === 0) {
            dispatch(fetchAllBlogs());
            navigate('/admin/blog');
            toast.success('Update blog successfully');
        } else {
            toast.error(res.message);
        }
    }
}

export const deleteBlog = (id) => {
    return async (dispatch, getState) => {
        let res = await deleteBlogService(id);
        if (res?.errCode === 0) {
            dispatch(fetchAllBlogs());
            toast.success('Delete blog successfully');
        } else {
            toast.error(res.message);
        }
    }
}

export const fetchBlogById = (id) => {
    return async (dispatch, getState) => {
        let res = await getBlogByIdService(id);
        if (res?.errCode === 0) {
            dispatch({
                type: FETCH_BLOG_BY_ID_SUCCESS,
                data: res.data
            })
        } else {
            dispatch({
                type: FETCH_BLOG_BY_ID_ERROR
            })
        }
    }
}