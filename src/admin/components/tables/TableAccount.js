import { Table } from 'react-bootstrap';
import { useEffect } from 'react';
import { useState } from 'react';
import _ from 'lodash';
import { editUser } from '../../../redux/actions/userAction';
import { useDispatch } from 'react-redux';

const TableAccount = (props) => {

    let { listAccount } = props;
    const dispatch = useDispatch();
    const { dataAccountDeleteFromChildToParent } = props;
    const [dataAccount, setDataAccount] = useState([]);

    useEffect(() => {
        setDataAccount(listAccount)
    }, [listAccount])

    const handleSort = (sort, sortField) => {
        let cloneListAccount = _.cloneDeep(dataAccount);
        cloneListAccount = _.orderBy(cloneListAccount, [sortField], [sort])
        setDataAccount(cloneListAccount)
    }

    const handleChangeRole = (event, account) => {
        const isAdmin = event.target.value;
        if (window.confirm('Bạn có chắc chắn muốn thay đổi?')) {
            dispatch(editUser(account.id, isAdmin))
        }
    }

    const handleDeleteAccount = (account) => {
        dataAccountDeleteFromChildToParent(account);
    }

    return (
        <Table striped bordered hover variant="light" style={{ marginBottom: '0' }}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Tên tài khoản
                        <span className='float-end'>
                            <i className="fa-solid fa-arrow-down-long p-1"
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleSort('desc', 'username')}
                            ></i>
                            <i className="fa-solid fa-arrow-up-long p-1 "
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleSort('asc', 'username')}
                            ></i>
                        </span>
                    </th>
                    <th>Email</th>
                    <th>Phân quyền</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {dataAccount?.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{++index}</td>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>
                                <select className="form-select"
                                    value={item.isAdmin}
                                    onChange={(event) => handleChangeRole(event, item)}
                                >
                                    <option value='0' >Khách hàng</option>
                                    <option value='1' >Admin</option>
                                </select>
                            </td>
                            <td>
                                <button
                                    className='btn btn-danger m-1'
                                    onClick={() => handleDeleteAccount(item)}
                                >Xóa</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default TableAccount;