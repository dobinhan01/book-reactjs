import { Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../../../redux/actions/contactAction';

const TableContact = (props) => {

    const dispatch = useDispatch();
    const { listContact } = props;
    const handleDeleteContact = (item) => {
        dispatch(deleteContact(item.id));
    }

    return (
        <Table striped bordered hover variant="light" style={{ marginBottom: '0' }}>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Họ</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Số điện thoại</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                {listContact?.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.firstname}</td>
                            <td>{item.lastname}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.subject}</td>
                            <td>{item.message}</td>
                            <td>
                                <button
                                    className='btn btn-danger m-1'
                                    onClick={() => handleDeleteContact(item)}
                                >Xóa</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default TableContact;