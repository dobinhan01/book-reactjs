import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import { postAddBookToCart } from '../../../services/customerService';

class FlashSale extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrFlashSales: [],
            listDiscounts: [],
        }
    }

    componentDidMount() {
        this.props.fetchFlashSaleHome();
        this.props.fetchDiscountStart();
    }

    componentDidUpdate(prevProps, prevState, snaphot) {
        if (prevProps.flashSales !== this.props.flashSales) {
            this.setState({
                arrFlashSales: this.props.flashSales,
            })
        }
    }

    handleViewDetailBook = (book) => {
        if (this.props.history) {
            this.props.history.push(`/detail-book/${book.id}`);
        }
    }

    handleClickAddTOCar = async (event, book) => {
        event.stopPropagation();
        let user = this.props.user
        let res = await postAddBookToCart({
            userId: user.id,
            bookId: book.id
        })
        if (res && res.errCode === 0) {
            toast.success('Add a new book to cart succeed!')
        } else {
            toast.error('Add a new book to cart error!')
        }
    }

    render() {
        let arrFlashSales = this.state.arrFlashSales;
        let arrDiscounts = this.props.discounts;
        return (
            <div className='section-share section-flashsale'>
                <div className='section-container'>
                    <div className='section-header'>
                        <div className='section-header-top'>
                            <div className='section-icon'></div>
                            <div className='section-title'>FLASH SALE</div>
                            <div className='section-countdown'>
                                <span>Kết thúc trong</span>
                                <span className='section-countdown-number'>00</span><span>:</span>
                                <span className='section-countdown-number'>08</span><span>:</span>
                                <span className='section-countdown-number'>35</span>
                            </div>
                        </div>
                    </div>
                    <div className='section-content'>
                        <div className='section-slider'>
                            <Slider {...this.props.settings}>
                                {arrFlashSales && arrFlashSales.length > 0
                                    && arrFlashSales.map((item, index) => {
                                        let imageBase64 = '';
                                        let discount = '';
                                        if (item.image) {
                                            imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                        }
                                        if (item.discount) {
                                            discount = arrDiscounts.find((index) => {
                                                return index.key === item.discount;
                                            })
                                        }
                                        return (
                                            <div key={index} className='section-slider-item' onClick={() => this.handleViewDetailBook(item)}>
                                                {discount.valueVi !== '0' &&
                                                    <div className='section-slider-sale'>
                                                        <div className='section-slider-sale-discount'>
                                                            {discount.valueVi}%
                                                        </div>
                                                    </div>
                                                }
                                                <div className='section-slider-img'>
                                                    <img src={imageBase64} />
                                                </div>
                                                <div className='section-slider-name'>{item.name}</div>
                                                {discount.valueVi !== '0' ?
                                                    <div className='section-slider-price'>
                                                        <div className='section-slider-price-new'>
                                                            <NumberFormat
                                                                value={item.priceNew}
                                                                className="foo"
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                suffix={'đ'}
                                                            />
                                                        </div>
                                                        <div className='section-slider-price-odd'>
                                                            <NumberFormat
                                                                value={item.price}
                                                                className="foo"
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                suffix={'đ'}
                                                            />
                                                        </div>
                                                    </div>
                                                    :
                                                    <div className='section-slider-price'>
                                                        <div className='section-slider-price-new'>
                                                            <NumberFormat
                                                                value={item.priceNew}
                                                                className="foo"
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                suffix={'đ'}
                                                            />
                                                        </div>
                                                    </div>
                                                }
                                                <div className='section-slider-add-to-car'
                                                    onClick={(event) => this.handleClickAddTOCar(event, item)}
                                                >
                                                    Add to cart
                                                    <i className="fas fa-shopping-cart"></i>
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </Slider>
                        </div>
                        <div className='section-more'>
                            <button className='section-btn'>Xem thêm</button>
                        </div>
                    </div>
                </div>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        user: state.user.userInfo,
        isLoggedIn: state.user.isLoggedIn,
        flashSales: state.book.flashSaleHome,
        discounts: state.book.discounts,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchFlashSaleHome: () => dispatch(actions.fetchFlashSaleHome()),
        fetchDiscountStart: () => dispatch(actions.fetchDiscountStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FlashSale));
