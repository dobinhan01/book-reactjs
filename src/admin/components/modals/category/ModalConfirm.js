import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { deleteCategory } from '../../../../redux/actions/categoryAction';

const ModalConfirm = (props) => {

    const dispatch = useDispatch();

    const { show, handleClose, dataCategoryDelete } = props;

    const handleConfirmDelete = async () => {
        await dispatch(deleteCategory(dataCategoryDelete.id));
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
                <Modal.Title>Xóa danh mục</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='body-add-new'>
                    Hành động này không thể hoàn tác! Bạn có muốn xóa danh mục này không?
                    <br />
                    <b>Tên danh mục = {dataCategoryDelete.name}</b>
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