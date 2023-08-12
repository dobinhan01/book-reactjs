import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { fetchAllPublishers } from '../../../redux/actions/publisherAction';

const sortSelect = [{
    key: 'newest',
    value: 'Mới nhất'
},
{
    key: 'asc',
    value: 'Giá (tăng dần)'
},
{
    key: 'desc',
    value: 'Giá (giảm dần)'
}]

const Filter = (props) => {

    const { filterAndSort } = props;

    const dispatch = useDispatch();
    const [filterPublisher, setFilterPublisher] = useState('');
    const [sort, setSort] = useState('');
    const { publishers } = useSelector(state => state.publisher);

    useEffect(() => {
        dispatch(fetchAllPublishers());
    }, [dispatch])

    useEffect(() => {
        filterAndSort(filterPublisher, sort)
    }, [filterAndSort, filterPublisher, sort])

    return (
        <div className='Filter d-flex align-items-center justify-content-between my-4'>
            <div className='d-flex align-items-center gap-3'>
                <span className='text-nowrap fw-bold'>Lọc sản phẩm:</span>
                <Form.Select type="select" className='shadow-none'
                    value={filterPublisher}
                    onChange={(event) => setFilterPublisher(event.target.value)}
                >
                    <option disabled value=''>Nhà xuất bản</option>
                    {publishers?.map((item, index) => {
                        return <option key={index}>{item.name}</option>
                    })}
                </Form.Select>
                {/* <Form.Select className='shadow-none'>
                    <option disabled>Large select</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select> */}
            </div>
            <div className='d-flex align-items-center gap-3'>
                <span className='text-nowrap fw-bold'>Sắp xếp sản phẩm:</span>
                <Form.Select className='shadow-none'
                    value={sort}
                    onChange={(event) => setSort(event.target.value)}
                >
                    <option disabled value=''>Mặc định</option>
                    {sortSelect?.map((item, index) => {
                        return <option key={index} value={item.key}>{item.value}</option>
                    })}
                </Form.Select>
            </div>
        </div>
    )
}

export default Filter; 