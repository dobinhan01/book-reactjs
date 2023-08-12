import axios from './customize-axios';

const getAllPublishers = () => {
    return axios.get('/api/get-all-publishers');
}

const createPublisherService = (payload) => {
    return axios.post('/api/create-publisher', payload);
}

const updatePublisherService = (id, payload) => {
    return axios.put(`/api/edit-publisher/${id}`, payload);
}

const deletePublisherService = (id) => {
    return axios.delete(`/api/delete-publisher/${id}`);
}

export {
    getAllPublishers, createPublisherService, updatePublisherService, deletePublisherService
};