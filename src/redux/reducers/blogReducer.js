import {
    FETCH_ALL_BLOGS_SUCCESS, FETCH_ALL_BLOGS_ERROR,
    FETCH_BLOG_BY_ID_SUCCESS, FETCH_BLOG_BY_ID_ERROR
} from '../actions/blogAction'

const INITIAL_STATE = {
    blogs: null,
    blogById: null
};

const blogReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ALL_BLOGS_SUCCESS:
            return {
                ...state,
                blogs: action.data
            }
        case FETCH_ALL_BLOGS_ERROR:
            return {
                ...state,
                blogs: null
            }
        case FETCH_BLOG_BY_ID_SUCCESS:
            return {
                ...state,
                blogById: action.data
            }
        case FETCH_BLOG_BY_ID_ERROR:
            return {
                ...state,
                blogById: null
            }
        default: return state;
    }
}

export default blogReducer;