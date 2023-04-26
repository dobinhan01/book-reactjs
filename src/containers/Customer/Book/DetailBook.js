import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailBook.scss';
import * as actions from '../../../store/actions';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import { getDetaiInfoBook } from '../../../services/bookService';
import { postAddBookToCart } from '../../../services/customerService';

class DetailBook extends Component {

    constructor(props) {
        super(props)
        this.state = {
            detailBook: [],
            discount: '',
            quantity: '',

            isOpen: false,
        }
    }

    async componentDidMount() {
        this.props.fetchDiscountStart();
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetaiInfoBook(id);
            if (res && res.data) {
                this.setState({
                    detailBook: res.data,
                    quantity: 1,
                })

            }
        }
    }

    componentDidUpdate(prevProps, prevState, snaphot) {

    }

    openPreviewImage = () => {
        this.setState({
            isOpen: true
        })
    }

    handleChangeQuantity = (quantity, key) => {
        if (key === 'minus' && quantity > 1) --quantity
        if (key === 'plus' && quantity < 100) ++quantity
        return this.setState({
            quantity: quantity,
        })
    }

    renderPrice = (detailBook) => {
        if (detailBook && detailBook.discount) {
            let arrDiscounts = this.props.discounts;
            let discountValue = arrDiscounts.find((item) => {
                return item.key === detailBook.discount
            })
            return (
                discountValue.valueVi === '0' ?
                    <div className='price-book'>
                        <div className='price-new'>
                            <NumberFormat
                                value={detailBook.price}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'đ'}
                            />
                        </div>
                    </div>
                    :
                    <div className='price-book'>
                        <div className='price-new'>
                            <NumberFormat
                                value={detailBook.priceNew}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'đ'}
                            />
                        </div>
                        <div className='price-old'>
                            <NumberFormat
                                value={detailBook.price}
                                displayType={'text'}
                                thousandSeparator={true}
                                suffix={'đ'}
                            />
                        </div>
                        <div className='discount'>{discountValue.valueEn}%</div>
                    </div>
            )
        }
    }

    handleClickAddTOCar = async (book) => {
        let { user } = this.props;
        let { detailBook, quantity } = this.state;
        let res = await postAddBookToCart({
            userId: user.id,
            bookId: detailBook.id,
            quantity: quantity,
        })

        if (res && res.errCode === 0) {
            toast.success('Add a new book to cart succeed!')
        } else {
            toast.error('Add a new book to cart error!')
        }
    }

    render() {
        let { detailBook, quantity } = this.state
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className='book-detail-container'>
                    <div className='view-book'>
                        <div className='content-left'>
                            <div className='image-book'
                                style={{ backgroundImage: `url(${detailBook && detailBook.image ? detailBook.image : ''})` }}
                                onClick={() => this.openPreviewImage()}
                            ></div>
                            <div className='add-book'>
                                <button className='btn-add-cart'
                                    onClick={() => this.handleClickAddTOCar()}
                                >
                                    <i className="fas fa-shopping-cart"></i>
                                    Thêm vào giỏ hàng
                                </button>
                                <button className='btn-buy-book'>
                                    Mua ngay
                                </button>
                            </div>
                        </div>
                        <div className='content-right'>
                            {detailBook && detailBook.name &&
                                <div className='title-book'>
                                    {detailBook.name}
                                </div>
                            }
                            <div className='desc-book'>
                                <div className='desc-book-left'>
                                    Nhà suất bản: {detailBook && detailBook.publisher && <b>{detailBook.publisher}</b>}
                                </div>
                                <div className='desc-book-right'>
                                    Tác giả: {detailBook && detailBook.author && <b>{detailBook.author}</b>}
                                </div>
                            </div>
                            {this.renderPrice(detailBook)}
                            <div className='policy-book'>
                                <div>Chính sách đổi trả</div>
                                <div>Đổi trả sản phẩm trong 30 ngày</div>
                            </div>
                            <div className='quantity-book'>
                                <span>Số lượng:</span>
                                <div className='quantity-box'>
                                    <div className='minus'
                                        onClick={() => this.handleChangeQuantity(quantity, 'minus')}
                                    >
                                        <i className="fas fa-minus"></i>
                                    </div>
                                    <input className='quantity form-control' type="text" disabled
                                        defaultValue={quantity}
                                    />
                                    <div className='plus'
                                        onClick={() => this.handleChangeQuantity(quantity, 'plus')}
                                    >
                                        <i className="fas fa-plus"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='info-book'>
                        <div className='heading-title'>
                            Thông tin sản phẩm
                        </div>
                        <div className='content-info'>
                            {detailBook && detailBook.contentHTML &&
                                <div dangerouslySetInnerHTML={{ __html: detailBook.contentHTML }}></div>
                            }
                        </div>
                    </div>
                    <div className='comment-book'>

                    </div>
                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={`${detailBook && detailBook.image ? detailBook.image : ''}`}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.userInfo,
        discounts: state.book.discounts,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDiscountStart: () => dispatch(actions.fetchDiscountStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailBook);
