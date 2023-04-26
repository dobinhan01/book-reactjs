import axios from "../axios";

const getAllBooks = () => {
    return axios.get('/api/get-all-books');
}

const createNewBookService = (data) => {
    return axios.post('/api/create-new-book', data)
}

const deleteBookService = (id) => {
    return axios.delete('/api/delete-book', {
        data: {
            id: id
        }
    })
}

const editBookService = (inputData) => {
    return axios.put('/api/edit-book', inputData)
}

const getFlashSaleHome = (limit) => {
    return axios.get(`api/get-flash-sale-home?limit=${limit}`)
}

const getDetaiInfoBook = (id) => {
    return axios.get(`/api/get-detail-book-by-id?id=${id}`)
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`)
}

const getBookByCategory = (category) => {
    return axios.get(`/api/get-book-by-category?categoryId=${category}`)
}

export {
    getAllBooks, createNewBookService,
    deleteBookService, editBookService, getFlashSaleHome,
    getDetaiInfoBook, getAllCodeService, getBookByCategory
}