import axios from "../axios";

const getAllCategories = (id) => {
    return axios.get(`/api/get-all-categories?id=${id}`, { id: id })
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

export {
    getAllCategories, createNewCategoryService, deleteCategoryService, editCategoryService
}