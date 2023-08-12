import './ModalPublisher.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import CommonUtils from '../../../../utils/CommonUtils';
import { createPublisher } from '../../../../redux/actions/publisherAction';

const ModalAddPublisher = (props) => {

    const { show, handleClose } = props;
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [img, setImg] = useState('');

    const handleChangeImg = async (event) => {
        let file = event.target.files[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            setImg(base64);
        }
    }

    const handleClick = () => {
        const payload = { name, desc, img };
        dispatch(createPublisher(payload));
        setName('');
        setDesc('');
        setImg('');
        handleClose();
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Thêm nhà xuất bản mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Tên nhà xuất bản</Form.Label>
                    <Form.Control type="text" placeholder="Tên nhà xuất bản..."
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Thông tin</Form.Label>
                    <Form.Control type="text" placeholder="Thông tin..."
                        value={desc}
                        onChange={(event) => setDesc(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3 d-flex flex-column">
                    <Form.Label>Hình ảnh</Form.Label>
                    <Form.Label className="file-upload" htmlFor="file">
                        {!img ?
                            <div className='file-upload-wrap'>
                                <div className="icon">
                                    <i className="fa-regular fa-file-image"></i>
                                </div>
                                <div className="text">
                                    <span>Click to upload image</span>
                                </div>
                            </div>
                            :
                            <div className='file-upload-wrap'>
                                <img src={img} alt='' height='140' />
                            </div>
                        }
                    </Form.Label>
                    <Form.Control type="file" id="file" hidden
                        onChange={(event) => handleChangeImg(event)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Hủy
                </Button>
                <Button variant="primary"
                    onClick={() => handleClick()}
                >Tạo mới</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAddPublisher;