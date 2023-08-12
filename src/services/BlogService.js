import axios from './customize-axios';

const getAllBlogsService = () => {
    return axios.get('/api/get-all-blogs');
}

const createBlogService = (payload) => {
    return axios.post('/api/create-blog', payload);
}

const updateBlogService = (id, payload) => {
    return axios.put(`/api/edit-blog/${id}`, payload);
}

const deleteBlogService = (id) => {
    return axios.delete(`/api/delete-blog/${id}`);
}
const getBlogByIdService = (id) => {
    return axios.get(`/api/get-blog-by-id/${id}`);
}

export {
    getAllBlogsService, createBlogService, updateBlogService, deleteBlogService,
    getBlogByIdService
};