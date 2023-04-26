import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailCart.scss';
import * as actions from '../../../store/actions';
import HomeHeader from '../../HomePage/HomeHeader';
import NumberFormat from 'react-number-format';
import { updateCartByUserId } from '../../../services/customerService';

class DetailCart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: '',
            arrCarts: [],
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.props.fetchAllCartsByUserId(id);
        }
    }

    componentDidUpdate(prevProps, prevState, snaphot) {
        if (prevProps.carts !== this.props.carts) {
            this.setState({
                arrCarts: this.props.carts
            })
        }
    }

    handleChangeQuantity = async (item, key) => {
        if (key === 'minus' && item.quantity > 1) --item.quantity
        if (key === 'plus' && item.quantity < 100) ++item.quantity
        let res = await updateCartByUserId({
            userId: item.userId,
            bookId: item.bookId,
            quantity: item.quantity,
            totalPrice: item.quantity * item.Book.priceNew,
        })
    }

    render() {
        let { arrCarts } = this.state;
        let total = 0;
        console.log(this.props)
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className='cart-detail-container'>
                    <div className='cart-title'>
                        <h1>GIỎ HÀNG</h1>
                        <span>({8} sản phẩm)</span>
                    </div>
                    <div className='cart-content'>
                        <div className='content-left'>
                            <div className='header-cart'>
                                <div className='checkbox-all'>
                                    <input className="form-check-input" type="checkbox" id="checkbox-all" />
                                </div>
                                <div className='header-cart-item'>
                                    <span>Chọn tất cả <span>8</span> sản phẩm</span>
                                </div>
                                <div className='header-cart-item'>Số lượng</div>
                                <div className='header-cart-item'>Thành tiền</div>
                                <div className='header-cart-item'>Xóa</div>
                            </div>
                            <div className='product-cart'>

                                {arrCarts && arrCarts.length > 0 &&
                                    arrCarts.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.Book.image) {
                                            imageBase64 = Buffer.from(item.Book.image, 'base64').toString('binary');
                                        }
                                        total = total + item.totalPrice;
                                        return (
                                            <div key={index} className='product-cart-item'>
                                                <div className='checkbox-item'>
                                                    <input className="form-check-input" type="checkbox" name="checkbox-item" />
                                                </div>
                                                <div className='product-img'
                                                    style={{ backgroundImage: `url(${imageBase64})` }}
                                                ></div>
                                                <div className='product-info'>
                                                    <div>{item.Book.name}</div>
                                                    <div className='product-price'>
                                                        <div className='priceNew'>
                                                            <NumberFormat
                                                                value={item.Book.priceNew}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                suffix={'đ'}
                                                            />
                                                        </div>
                                                        <div className='priceOld'>
                                                            <NumberFormat
                                                                value={item.Book.price}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                suffix={'đ'}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product-quantity">
                                                    <div className="minus"
                                                        onClick={() => this.handleChangeQuantity(item, 'minus')}
                                                    >
                                                        <i className="fas fa-minus"></i>
                                                    </div>
                                                    <input className="quantity form-control" type="text" disabled
                                                        value={item.quantity}
                                                    />
                                                    <div className="plus"
                                                        onClick={() => this.handleChangeQuantity(item, 'plus')}
                                                    >
                                                        <i className="fas fa-plus"></i>
                                                    </div>
                                                </div>
                                                <div className='product-total-price'>
                                                    <NumberFormat
                                                        value={item.totalPrice}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={'đ'}
                                                    />
                                                </div>
                                                <div className='product-remove'>
                                                    <i className="far fa-trash-alt"></i>
                                                </div>
                                            </div>
                                        )
                                    })

                                }

                            </div>
                        </div>
                        <div className='content-right'>
                            <div className='total-cart'>
                                <div className='total-cart-heding'>
                                    <div className='left'>Tổng số tiền:</div>
                                    <div className='right'>
                                        <NumberFormat
                                            value={total}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'đ'}
                                        />
                                    </div>
                                </div>
                                <div className='final-total'>
                                    <div className='btn-pay'>THANH TOÁN</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.userInfo,
        carts: state.customer.carts,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCartsByUserId: (id) => dispatch(actions.fetchAllCartsByUserId(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailCart);
