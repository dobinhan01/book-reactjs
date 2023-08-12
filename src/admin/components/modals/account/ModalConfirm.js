import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { deleteUser } from '../../../../redux/actions/userAction';

const ModalConfirm = (props) => {

    const dispatch = useDispatch();

    const { show, handleClose, dataAccountDelete } = props;

    const handleConfirmDelete = async () => {
        await dispatch(deleteUser(dataAccountDelete.id));
        handleClose();
    }

    return (<>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete a user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='body-add-new'>
                    Hành động này không thể được hoàn tác! Bạn có muốn xóa tài khoản này không?
                    <br />
                    <b>Email = {dataAccountDelete.email}</b>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={() => handleConfirmDelete()}>
                    Đồng ý
                </Button>
            </Modal.Footer>
        </Modal>

    </>)
}

export default ModalConfirm;