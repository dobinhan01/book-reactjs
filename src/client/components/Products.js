import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from './Product';
import { getProducts } from '../../redux/actions/productAction';

const Products = (props) => {

    const { category, filter, sort } = props;

    const dispatch = useDispatch();
    const { productsByCategory } = useSelector(state => state.product);
    const [listProducts, setListProducts] = useState([]);
    const [filteredProduct, setFilteredProduct] = useState([]);

    useEffect(() => {
        dispatch(getProducts(category));
    }, [dispatch, category]);

    useEffect(() => {
        setListProducts(productsByCategory);
    }, [productsByCategory]);

    useEffect(() => {
        setFilteredProduct(listProducts);
    }, [listProducts]);

    useEffect(() => {
        if (listProducts && filter) {
            setFilteredProduct(
                listProducts.filter(item => item.name === filter)
            )
        }
    }, [listProducts, category, filter]);

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
        <div className='d-flex justify-content-start flex-wrap gap-4 py-3'>
            {filteredProduct.length > 0 ?
                filteredProduct.map((item, index) => {
                    return <Product key={index} item={item} />
                })
                :
                <h3 className='py-5'>Không có sản phẩm phù hợp với tìm kiếm của bạn</h3>
            }
        </div>
    )
}

export default Products;