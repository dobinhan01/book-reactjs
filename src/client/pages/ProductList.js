import { useLocation } from 'react-router-dom';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import Filter from '../components/filter/Filter';
import Products from '../components/Products';
import { useState } from 'react';

const ProductList = () => {

    const location = useLocation();
    const category = location.pathname.split("/")[2];
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('');

    const handleFilterAndSort = (filter, sort) => {
        setFilter(filter);
        setSort(sort);
    }

    return (
        <div className='ProductList'>
            <Breadcrumb
                children1={category}
                navigate1={location.pathname}
                children2='Danh mục sản phẩm'
                navigate2='/products'
            />
            <div className='container'>
                <Filter filterAndSort={handleFilterAndSort} />
                <Products category={category} filter={filter} sort={sort} />
            </div>
        </div>
    )
}

export default ProductList; 