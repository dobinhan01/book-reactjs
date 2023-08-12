import { Table } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import _ from 'lodash';

const TableCategory = (props) => {

    let { listCategory } = props
    const { dataCategoryEditFromChildToParent, dataCategoryDeleteFromChildToParent } = props
    const [dataCategory, setDataCategory] = useState([]);

    useEffect(() => {
        setDataCategory(listCategory)
    }, [listCategory])

    const handleEditCategory = (category) => {
        dataCategoryEditFromChildToParent(category);
    }

    const handleDeleteCategory = (category) => {
        dataCategoryDeleteFromChildToParent(category);
    }

    const handleSort = (sort, sortField) => {
        let cloneListCategory = _.cloneDeep(dataCategory);
        cloneListCategory = _.orderBy(cloneListCategory, [sortField], [sort])
        setDataCategory(cloneListCategory)
    }

    return (
        <Table striped bordered hover variant="light" style={{ marginBottom: '0' }}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên danh mục
                        <span className='float-end'>
                            <i className="fa-solid fa-arrow-down-long p-1"
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleSort('desc', 'name')}
                            ></i>
                            <i className="fa-solid fa-arrow-up-long p-1 "
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleSort('asc', 'name')}
                            ></i>
                        </span>
                    </th>
                    <th>Hình ảnh</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {dataCategory?.map((item, index) => {
                    let priviewImg = new Buffer(item.img, 'base64').toString('binary');
                    return (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                                {priviewImg ? <img src={priviewImg} alt='' width='80' height='80' /> : 'No img'}
                            </td>
                            <td>{item.status === 0 ? 'Ẩn' : 'Hiện'}</td>
                            <td>
                                <button
                                    className='btn btn-warning m-1'
                                    onClick={() => handleEditCategory(item)}
                                >Sửa</button>
                                <button
                                    className='btn btn-danger m-1'
                                    onClick={() => handleDeleteCategory(item)}
                                >Xóa</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default TableCategory;