import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import Product from '../../components/Product';
import _ from 'lodash';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Filter from '../../components/filter/Filter';
import { fetchAllProducts } from '../../../redux/actions/productAction';

const Products = () => {

    const dispatch = useDispatch();
    const [searchParams] = useSearchParams()
    const { products } = useSelector(state => state.product);
    const [listProducts, setListProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('');
    const [filteredProduct, setFilteredProduct] = useState([]);

    useEffect(() => {
        setSearch(searchParams.get('q'))
    }, [searchParams])

    useEffect(() => {
        dispatch(fetchAllProducts());
    }, [dispatch])

    useEffect(() => {
        setListProducts(products)
    }, [products])

    const handleFilterAndSort = (filter, sort) => {
        setFilter(filter);
        setSort(sort);
    }

    useEffect(() => {
        setFilteredProduct(listProducts);
    }, [listProducts]);

    useEffect(() => {
        let cloneListProducts = _.cloneDeep(listProducts);
        if (listProducts && search) {
            cloneListProducts = cloneListProducts.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
        }
        if (listProducts && filter) {
            cloneListProducts = cloneListProducts.filter(item => item.Publisher.name === filter)
        }
        setFilteredProduct(cloneListProducts)
    }, [listProducts, filter, search]);

    useEffect(() => {
        if (sort === "newest") {
            setFilteredProduct((prev) =>
                [...prev].sort((a, b) => b.id - a.id)
            );
        } else if (sort === "asc") {
            setFilteredProduct((prev) =>
                [...prev].sort((a, b) => a.price - b.price)
            );
        } else if (sort === "desc") {
            setFilteredProduct((prev) =>
                [...prev].sort((a, b) => b.price - a.price)
            );
        }
    }, [sort, filter]);

    return (
        <div className='pb-5'>
            <Breadcrumb
                children1='sản phẩm'
                navigate1='/products'
            />
            <div className='container'>
                {search && <h3 className='py-3'>Kết quả tìm kiếm: {search} ({filteredProduct.length} kết quả)</h3>}
                <Filter filterAndSort={handleFilterAndSort} />
                <div className='row'>
                    {filteredProduct?.map((item, index) => {
                        return (
                            <div className='col-3' key={index}>
                                <Product item={item} />
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        </div>
    )
}

export default Products; 