import axios from "../axios";

const getAllCategories = () => {
    return axios.get('/api/get-all-categories')
}

const createNewCategoryService = (data) => {
    return axios.post('/api/create-new-category', data)
}

const deleteCategoryService = (id) => {
    return axios.delete('/api/delete-category', {
        data: {
            id: id
        }
    })
}

const editCategoryService = (inputData) => {
    return axios.put('/api/edit-category', inputData)
}

const getCategoryHome = (limit) => {
    return axios.get(`/api/category-home?limit=${limit}`)
}

export {
    getAllCategories, createNewCategoryService,
    deleteCategoryService, editCategoryService, getCategoryHome
}