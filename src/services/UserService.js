import axios from './customize-axios';

const getAllUsersService = () => {
    return axios.get(`/api/get-all-users`);
}

const createUserService = (payload) => {
    return axios.post('/api/create-user', payload);
}

const editUserService = (id, isAdmin) => {
    return axios.put(`/api/edit-user/${id}`, { isAdmin });
}

const deleteUserService = (id) => {
    return axios.delete(`/api/delete-user/${id}`);
}

const getAllcode = (type) => {
    return axios.get(`/api/get-allcode?type=${type}`);
}

const getUserInfoService = (id) => {
    return axios.get(`/api/get-user-info?id=${id}`);
}

const putUserInfoService = (id, payload) => {
    return axios.put(`/api/edit-user-info/${id}`, payload);
}

const getAmountDashboardService = () => {
    return axios.get(`/api/get-amount-dashboard`);
}

export {
    getAllUsersService, createUserService, editUserService, deleteUserService,
    getAllcode, getUserInfoService, putUserInfoService, getAmountDashboardService
};