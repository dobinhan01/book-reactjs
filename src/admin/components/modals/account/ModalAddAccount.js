import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { createUser } from '../../../../redux/actions/userAction';

const ModalAddAccount = (props) => {

    const { show, handleClose } = props;
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleClick = () => {
        const payload = { username, email, password };
        dispatch(createUser(payload));
        setUsername('');
        setEmail('');
        setPassword('');
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
                <Modal.Title>Thêm tài khoản mới</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Tên tài khoản</Form.Label>
                    <Form.Control type="text" placeholder="Tên tài khoản..."
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Email..."
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control type="text" placeholder="Mật khẩu..."
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Hủy
                </Button>
                <Button variant="primary"
                    onClick={() => handleClick()}
                >Tạo tài khoản</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAddAccount;