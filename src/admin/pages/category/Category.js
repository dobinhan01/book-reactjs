import './Category.scss';
import _ from 'lodash';
import { debounce } from 'lodash';
import TableCategory from '../../components/tables/TableCategory';
import ModalAddCategory from '../../components/modals/category/ModalAddCategory';
import ModalEditCategory from '../../components/modals/category/ModalEditCategory';
import ModalConfirm from '../../components/modals/category/ModalConfirm';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories } from '../../../redux/actions/categoryAction';

const Category = () => {

    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.category);
    const [listCategory, setListCategory] = useState([]);

    const [isShowModalAddCategory, setIsShowModalAddCategory] = useState(false);
    const [isShowModalEditCategory, setIsShowModalEditCategory] = useState(false);
    const [dataCategoryEdit, setDataCategoryEdit] = useState({});
    const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
    const [dataCategoryDelete, setDataCategoryDelete] = useState({});

    useEffect(() => {
        dispatch(fetchAllCategories());
    }, [dispatch])
    useEffect(() => {
        setListCategory(categories)
    }, [categories])

    const handleClose = () => {
        setIsShowModalAddCategory(false);
        setIsShowModalConfirm(false);
        setIsShowModalEditCategory(false);
    }

    const handleEditCategory = (category) => {
        setDataCategoryEdit(category);
        setIsShowModalEditCategory(true)
    }

    const handleDeleteCategory = (category) => {
        setDataCategoryDelete(category);
        setIsShowModalConfirm(true)
    }

    const handleSearch = debounce((event) => {
        let term = event.target.value.toLowerCase();
        if (term) {
            let cloneListCategory = _.cloneDeep(categories);
            cloneListCategory = cloneListCategory.filter(item => item.name.toLowerCase().includes(term))
            setListCategory(cloneListCategory)
        } else {
            dispatch(fetchAllCategories());
        }
    }, 500)

    return (
        <div className='Category' style={{ padding: '76px 16px 30px' }}>
            <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: '30px' }}>
                <h1 className="m-0">Danh mục sách</h1>
                <button className='btn btn-success'
                    onClick={() => setIsShowModalAddCategory(true)}
                >
                    Thêm danh mục mới
                </button>
            </div>
            <div className='search'>
                <div className='icon'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <input type='text' placeholder='Tìm kiếm danh mục theo tên...'
                    onChange={(event) => handleSearch(event)}
                />
            </div>
            <TableCategory
                listCategory={listCategory}
                dataCategoryEditFromChildToParent={handleEditCategory}
                dataCategoryDeleteFromChildToParent={handleDeleteCategory}
            />
            <ModalAddCategory
                show={isShowModalAddCategory}
                handleClose={handleClose}
            />
            <ModalEditCategory
                show={isShowModalEditCategory}
                handleClose={handleClose}
                dataCategoryEdit={dataCategoryEdit}
            />
            <ModalConfirm
                show={isShowModalConfirm}
                handleClose={handleClose}
                dataCategoryDelete={dataCategoryDelete}
            />
        </div>
    )
}

export default Category;