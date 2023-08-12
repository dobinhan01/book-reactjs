import { useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { deletePublisher } from '../../../../redux/actions/publisherAction';

const ModalConfirm = (props) => {

    const dispatch = useDispatch();

    const { show, handleClose, dataOrderDelete } = props;

    const handleConfirmDelete = async () => {
        await dispatch(deletePublisher(dataOrderDelete.id));
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
                <Modal.Title>Delete a order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='body-add-new'>
                    This action can't be undone! Do want to delete this order?
                    <br />
                    <b>order = {dataOrderDelete.name}</b>
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