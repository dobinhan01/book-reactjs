import axios from './customize-axios';

const getAllContactsService = () => {
    return axios.get('/api/get-all-contacts');
}

const createContactService = (payload) => {
    return axios.post('/api/create-contact', payload);
}

const deleteContactService = (id) => {
    return axios.delete(`/api/delete-contact/${id}`);
}

export {
    getAllContactsService, createContactService, deleteContactService
};