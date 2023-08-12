import './ModalAddNewProduct.scss';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Modal, Button, Container, Row, Col } from 'react-bootstrap';
import CommonUtils from '../../../../utils/CommonUtils';
import { fetchAllPublishers } from '../../../../redux/actions/publisherAction';
import { fetchAllCategories } from '../../../../redux/actions/categoryAction';
import { fetchAllcode } from '../../../../redux/actions/userAction';
import { createProduct } from '../../../../redux/actions/productAction';

const ModalAddNewProduct = (props) => {

    const dispatch = useDispatch();

    const { show, handleClose } = props;
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [oldPrice, setOldPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [quantityStock, setQuantityStock] = useState('');
    const [img, setImg] = useState('');

    const [dataSelectPublisher, setDataSelectPublisher] = useState([]);
    const [dataSelectCategory, setDataSelectCategory] = useState([]);
    const [dataSelectDiscount, setDataSelectDiscount] = useState([]);

    const [validated, setValidated] = useState(false);
    const [discounts, setDiscounts] = useState([]);


    const { publishers } = useSelector(state => state.publisher);
    const { categories } = useSelector(state => state.category);
    const { allcodes } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(fetchAllPublishers());
        dispatch(fetchAllCategories());
        dispatch(fetchAllcode());
    }, [dispatch])
    useEffect(() => {
        setDiscounts(allcodes?.discounts)
    }, [allcodes])
    useEffect(() => {
        setDataSelectPublisher(publishers)
        setDataSelectCategory(categories)
        setDataSelectDiscount(discounts)
    }, [publishers, categories, discounts])

    useEffect(() => {
        if (oldPrice && discount) {
            let discountValue = discounts?.find(item => item.key === discount).value;
            setPrice(oldPrice - oldPrice * discountValue / 100);
        }
    }, [oldPrice, discount, discounts])

    const handleChangeImg = async (event) => {
        let file = event.target.files[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            setImg(base64);
        }

    }

    const handleSubmit = async () => {
        setValidated(true);
        if (title && desc && author && publisher && oldPrice && discount && price && category && img && quantityStock) {
            const payload = {
                title, desc, author, discount, img,
                quantityStock: +quantityStock,
                oldPrice: +oldPrice,
                price: +price,
                publisherId: +publisher,
                categoryId: +category
            }
            await dispatch(createProduct(payload));
            handleClose();
            setTitle('');
            setDesc('');
            setAuthor('');
            setPublisher('');
            setOldPrice('');
            setDiscount('');
            setPrice('');
            setCategory('');
            setQuantityStock('');
            setImg('');
            setValidated(false);
        }
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
            className='ModalProduct'
        >
            <Modal.Header closeButton>
                <Modal.Title>Thêm sản phẩm mới</Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid"><Container>
                <Form noValidate validated={validated}>
                    <Row>
                        <Form.Group as={Col} md="4" className="mb-3">
                            <Form.Label>Tên sách</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Tên sách..."
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">Vui lòng nhập tên sách</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" className="mb-3">
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Mô tả..."
                                value={desc}
                                onChange={(event) => setDesc(event.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">Vui lòng nhập mô tả</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" className="mb-3">
                            <Form.Label>Tác giả</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Tác giả..."
                                value={author}
                                onChange={(event) => setAuthor(event.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">Vui lòng nhập tên tác giả</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" className="mb-3">
                            <Form.Label>Nhà xuất bản</Form.Label>
                            <Form.Select
                                required
                                type="select"
                                value={publisher}
                                onChange={(event) => setPublisher(event.target.value)}
                            >
                                <option disabled value=''>Chọn nhà xuất bản</option>
                                {dataSelectPublisher?.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    )
                                })}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Vui lòng chọn nhà xuất bản</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" className="mb-3">
                            <Form.Label>Danh mục</Form.Label>
                            <Form.Select
                                required
                                type="select"
                                value={category}
                                onChange={(event) => setCategory(event.target.value)}
                            >
                                <option disabled value=''>Chọn danh mục</option>
                                {dataSelectCategory?.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id}>{item.name}</option>
                                    )
                                })}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Vui lòng chọn danh mục</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" className="mb-3">
                            <Form.Label>Số lượng trong kho</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Số lượng trong kho..."
                                pattern='^[0-9]+$'
                                value={quantityStock}
                                onChange={(event) => setQuantityStock(event.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {quantityStock ? 'Vui lòng nhập định dạng số' : 'Vui lòng nhập số lượng'}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" className="mb-3">
                            <Form.Label>Giá cũ</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Giá cũ..."
                                pattern='^[0-9]+$'
                                value={oldPrice}
                                onChange={(event) => setOldPrice(event.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                {oldPrice ? 'Vui lòng nhập định dạng số' : 'Vui lòng nhập giá cũ'}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" className="mb-3">
                            <Form.Label>Giảm giá</Form.Label>
                            <Form.Select
                                required
                                type="select"
                                value={discount}
                                onChange={(event) => setDiscount(event.target.value)}
                            >
                                <option value=''>Chọn giảm giá</option>
                                {dataSelectDiscount?.map((item, index) => {
                                    return (
                                        <option key={index} value={item.key}>
                                            -{item.value}%
                                        </option>
                                    )
                                })}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Vui lòng chọn giảm giá</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="4" className="mb-3">
                            <Form.Label>Giá</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Giá..."
                                pattern='^[0-9]+$'
                                value={price}
                                onChange={(event) => setPrice(event.target.value)}
                                disabled
                            />
                            <Form.Control.Feedback type="invalid">Vui lòng cung cấp giá</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3 d-flex flex-column">
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
                            <Form.Control required
                                type="file" id="file" hidden
                                onChange={(event) => handleChangeImg(event)}
                            />
                            <Form.Control.Feedback type="invalid">Vui lòng cung cấp hình ảnh</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                </Form>
            </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Hủy
                </Button>
                <Button variant="primary" onClick={() => handleSubmit()}>
                    Tạo sản phẩm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAddNewProduct;