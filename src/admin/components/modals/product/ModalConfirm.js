import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { deleteProduct } from '../../../../redux/actions/productAction';

const ModalConfirm = (props) => {

    const dispatch = useDispatch();

    const { show, handleClose, dataProductDelete } = props;

    const handleConfirmDelete = async () => {
        await dispatch(deleteProduct(dataProductDelete.id));
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
                    This action can't be undone! Do want to delete this product?
                    <br />
                    <b>title = {dataProductDelete.title}</b>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleConfirmDelete()}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>

    </>)
}

export default ModalConfirm;