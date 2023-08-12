import { Table } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import _ from 'lodash';

const TablePublisher = (props) => {

    let { listPublisher } = props;
    const { dataPublisherEditFromChildToParent, dataPublisherDeleteFromChildToParent } = props;
    const [dataPublisher, setDataPublisher] = useState([]);

    useEffect(() => {
        setDataPublisher(listPublisher)
    }, [listPublisher])

    const handleEditPublisher = (publisher) => {
        dataPublisherEditFromChildToParent(publisher);
    }

    const handleDeletePublisher = (publisher) => {
        dataPublisherDeleteFromChildToParent(publisher);
    }

    const handleSort = (sort, sortField) => {
        let cloneListPublisher = _.cloneDeep(dataPublisher);
        cloneListPublisher = _.orderBy(cloneListPublisher, [sortField], [sort])
        setDataPublisher(cloneListPublisher)
    }

    return (
        <Table striped bordered hover variant="light" style={{ marginBottom: '0' }}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên nhà xuất bản
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
                    <th style={{ width: '500px' }}>Thông tin</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {dataPublisher?.map((item, index) => {
                    let priviewImg = new Buffer(item.img, 'base64').toString('binary');
                    return (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>
                                <img src={priviewImg} alt='' width='80' height='80' />
                            </td>
                            <td>{item.desc}</td>
                            <td>
                                <button
                                    className='btn btn-warning m-1'
                                    onClick={() => handleEditPublisher(item)}
                                >Sửa</button>
                                <button
                                    className='btn btn-danger m-1'
                                    onClick={() => handleDeletePublisher(item)}
                                >Xóa</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default TablePublisher;