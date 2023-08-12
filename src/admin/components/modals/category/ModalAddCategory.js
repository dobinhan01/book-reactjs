import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import CommonUtils from '../../../../utils/CommonUtils';
import { createCategory } from '../../../../redux/actions/categoryAction';

const ModalAddCategory = (props) => {

    const { show, handleClose } = props;
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [img, setImg] = useState('');

    const handleChangeImg = async (event) => {
        let file = event.target.files[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            setImg(base64);
        }
    }

    const handleClick = () => {
        const payload = { name, img };
        dispatch(createCategory(payload));
        setName('');
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
                <Modal.Title>Thêm danh mục mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Tên danh mục</Form.Label>
                    <Form.Control type="text" placeholder="Tên danh mục..."
                        value={name}
                        onChange={(event) => setName(event.target.value)}
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

export default ModalAddCategory;