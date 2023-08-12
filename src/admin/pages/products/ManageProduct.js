import './ManageProduct.scss';
import _ from 'lodash';
import { debounce } from 'lodash';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableProduct from '../../components/tables/TableProduct';
import ModalAddNewProduct from '../../components/modals/product/ModalAddNewProduct';
import ModalEditProduct from '../../components/modals/product/ModalEditProduct';
import ModalConfirm from '../../components/modals/product/ModalConfirm';
import { fetchAllProducts } from '../../../redux/actions/productAction';

const ManageProduct = (props) => {

    const dispatch = useDispatch();
    const { products } = useSelector(state => state.product);
    const [listProducts, setListProducts] = useState([]);
    const [isShowModalAddNewProduct, setIsShowModalAddNewProduct] = useState(false);
    const [isShowModalEditProduct, setIsShowModalEditProduct] = useState(false);
    const [dataProductEdit, setDataProductEdit] = useState({});
    const [isShowModaConfirm, setIsShowModalConfirm] = useState(false);
    const [dataProductDelete, setDataProductDelete] = useState({});


    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch])

    useEffect(() => {
        setListProducts(products);
    }, [products])

    const handleEditProduct = (product) => {
        setDataProductEdit(product);
        setIsShowModalEditProduct(true)
    }

    const handleDeleteProduct = (product) => {
        setDataProductDelete(product);
        setIsShowModalConfirm(true)
    }

    const handleClose = () => {
        setIsShowModalAddNewProduct(false);
        setIsShowModalEditProduct(false);
        setIsShowModalConfirm(false);
    }

    const handleSearch = debounce((event) => {
        let term = event.target.value.toLowerCase();
        if (term) {
            let cloneListProducts = _.cloneDeep(products);
            cloneListProducts = cloneListProducts.filter(item => item.title.toLowerCase().includes(term))
            setListProducts(cloneListProducts)
        } else {
            dispatch(fetchAllProducts());
        }
    }, 500)

    return (
        <div className='ManageProduct'>
            <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: '30px' }}>
                <h1>Sản phẩm</h1>
                <button className='btn btn-success'
                    onClick={() => setIsShowModalAddNewProduct(true)}
                >
                    Thêm sản phẩm mới
                </button>
            </div>
            <div className='search'>
                <div className='icon'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <input type='text' placeholder='Tìm kiếm sản phẩm theo tên...'
                    onChange={(event) => handleSearch(event)}
                />
            </div>
            <TableProduct
                listProducts={listProducts}
                dataProductEditFromChildToParent={handleEditProduct}
                dataProductDeleteFromChildToParent={handleDeleteProduct}
            />
            <ModalAddNewProduct
                show={isShowModalAddNewProduct}
                handleClose={handleClose}
            />
            <ModalEditProduct
                show={isShowModalEditProduct}
                handleClose={handleClose}
                dataProductEdit={dataProductEdit}
            />
            <ModalConfirm
                show={isShowModaConfirm}
                handleClose={handleClose}
                dataProductDelete={dataProductDelete}
            />
        </div>
    )
}

export default ManageProduct;