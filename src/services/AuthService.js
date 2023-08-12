import axios from './customize-axios';

const loginService = (email, password) => {
    return axios.post('/api/login', { email, password });
}

const loginAdminService = (email, password) => {
    return axios.post('/api/login-admin', { email, password });
}

const registerService = (username, email, password) => {
    return axios.post('/api/register', { username, email, password });
}

const getCurrentUserService = () => {
    return axios.get('/api/get-current-user');
}

export {
    loginService, loginAdminService, registerService, getCurrentUserService
};