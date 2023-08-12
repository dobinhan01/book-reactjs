import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { deletePublisher } from '../../../../redux/actions/publisherAction';

const ModalConfirm = (props) => {

    const dispatch = useDispatch();

    const { show, handleClose, dataPublisherDelete } = props;

    const handleConfirmDelete = async () => {
        await dispatch(deletePublisher(dataPublisherDelete.id));
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
                <Modal.Title>Xóa nhà xuất bản</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='body-add-new'>
                    Hành động này không thể hoàn tác! Bạn có muốn xóa nhà xuất bản này không?
                    <br />
                    <b>Tên nhà xuất bản = {dataPublisherDelete.name}</b>
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