import { Table } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

const TableBlog = (props) => {

    let { listBlog } = props;
    const navigator = useNavigate();
    const { dataBlogDeleteFromChildToParent } = props;
    const [dataBlog, setDataBlog] = useState([]);

    useEffect(() => {
        setDataBlog(listBlog)
    }, [listBlog])

    const handleEditBlog = (item) => {
        navigator(`/admin/blog/edit/${item.id}`);
    }

    const handleDeleteBlog = (item) => {
        dataBlogDeleteFromChildToParent(item);
    }

    const handleSort = (sort, sortField) => {
        let cloneListBlog = _.cloneDeep(dataBlog);
        cloneListBlog = _.orderBy(cloneListBlog, [sortField], [sort])
        setDataBlog(cloneListBlog)
    }

    return (
        <Table striped bordered hover variant="light" style={{ marginBottom: '0' }}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th style={{ width: '480px' }}>Tiêu đề
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
                    <th>Tác giả</th>
                    <th>Ngày cập nhật</th>
                    <th>Thẻ</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {dataBlog?.map((item, index) => {
                    let priviewImg = new Buffer(item.img, 'base64').toString('binary');
                    return (
                        <tr key={index}>
                            <td>{++index}</td>
                            <td>{item.title}</td>
                            <td>
                                <img src={priviewImg} alt='' width='80' height='80' />
                            </td>
                            <td>{item.author}</td>
                            <td>{item.date}</td>
                            <td>{item.tag}</td>
                            <td>
                                <button
                                    className='btn btn-warning m-1'
                                    onClick={() => handleEditBlog(item)}
                                >Sửa</button>
                                <button
                                    className='btn btn-danger m-1'
                                    onClick={() => handleDeleteBlog(item)}
                                >Xóa</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default TableBlog;