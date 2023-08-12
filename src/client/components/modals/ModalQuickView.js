import './ModalQuickView.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { NumericFormat } from 'react-number-format';
import { toast } from 'react-toastify';
import { addProductToCart } from '../../../redux/actions/cartAction';

const ModalQuickView = (props) => {

    const { show, handleClose, dataProduct } = props;

    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const handleImg = (img) => {
        if (img) {
            return new Buffer.from(img, 'base64').toString('binary');
        }
    }

    const handleQuantity = (type) => {
        if (type === 'dec') {
            quantity > 1 && setQuantity(quantity - 1)
        } else {
            setQuantity(quantity + 1)
        }
    }

    const handleClick = () => {
        dispatch(addProductToCart({ ...dataProduct, quantity }));
        // toast.success('Add product to cart success')
    }

    const handleCloseModal = () => {
        handleClose();
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            className='ModalQuickView'
        >
            <Button className='btn-close'
                onClick={() => handleCloseModal()}
            ></Button>
            <Container fluid="md">
                <Row>
                    <Col xs={6} className='p-0'>
                        <img src={handleImg(dataProduct?.img)} alt='' />
                    </Col>
                    <Col xs={6} className='p-4'>
                        <div className='title'>{dataProduct?.title}</div>
                        <div className="author">By <span>{dataProduct?.author}</span></div>
                        <div className="publisher">Publisher: <span>{dataProduct?.Publisher.name}</span></div>
                        <div className='price'>
                            <NumericFormat value={dataProduct?.price}
                                displayType={'text'}
                                suffix={'đ'}
                                thousandSeparator=","
                            />
                        </div>
                        <div className='desc'>{dataProduct?.desc}</div>
                        <div className='add-container'>
                            <div className='amount-container'>
                                <button className='minus'
                                    onClick={() => handleQuantity('dec')}
                                >
                                    <i className='bx bx-minus'></i>
                                </button>
                                <span className='amount'>{quantity}</span>
                                <button className='plus'
                                    onClick={() => handleQuantity('inc')}
                                >
                                    <i className='bx bx-plus' ></i>
                                </button>
                            </div>
                            <button className='add-to-cart'
                                onClick={() => handleClick()}
                            >
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                        <div className='extra-info'>
                            <div className='item'>
                                <div className='info-icon'><i className="fa-solid fa-truck"></i></div>
                                <div className='info-text'>Thường được gửi đi trong 2 đến 3 ngày</div>
                            </div>
                            <div className='item'>
                                <div className='info-icon'><i className="fa-solid fa-file-invoice-dollar"></i></div>
                                <div className='info-text'>Thanh toán an toàn và bảo mật</div>
                            </div>
                        </div>
                        <div className='meta'>
                            <div className='meta-wrap'>
                                <span className='label'>Danh mục: </span>
                                <span className='value'>{dataProduct?.Category?.name}</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Modal >
    )
}

export default ModalQuickView;