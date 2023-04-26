import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailCategory.scss';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router';
import Select from 'react-select';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import { getAllCodeService, getBookByCategory } from '../../../services/bookService';
import { postAddBookToCart } from '../../../services/customerService';

class DetailCategory extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrCategories: [],
            arrPrices: [],
            arrBooks: [],
            listBookCategories: [],
            listBookPrices: [],

            filterPrice: '',
        }
    }

    async componentDidMount() {
        this.props.fetchAllCategories();
        this.props.fetchDiscountStart();
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let resBook = await getBookByCategory(id);
            let resPrice = await getAllCodeService('PRICE');
            if (resPrice && resPrice.data) {
                this.setState({
                    arrPrices: resPrice.data ? resPrice.data : [],
                    filterPrice: 'PRI0',
                })
            }
            if (resBook && resBook.data) {
                this.setState({
                    arrBooks: resBook.data ? resBook.data : [],
                    listBookCategories: resBook.data ? resBook.data : [],
                    filterPrice: 'PRI0',
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snaphot) {
        if (prevProps.categories !== this.props.categories) {
            this.setState({
                arrCategories: this.props.categories
            })
        }
        if (prevProps.match.params.id !== this.props.match.params.id) {
            let id = this.props.match.params.id;
            let resBook = await getBookByCategory(id)
            if (resBook && resBook.data) {
                this.setState({
                    arrBooks: resBook.data ? resBook.data : [],
                    listBookCategories: resBook.data ? resBook.data : [],
                    filterPrice: 'PRI0',
                })
            }
        }
    }

    handleOnClickCategory = async (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-category/${item.id}`);
        }
    }

    handleViewDetailBook = (book) => {
        if (this.props.history) {
            this.props.history.push(`/detail-book/${book.id}`);
        }
    }

    handleChangeRadio = async (item) => {
        let arrDiscounts = this.props.discounts;
        let copyArrBooks = this.state.listBookCategories;
        let value = item.valueVi.replaceAll(',', '').split('-');

        if (item.key !== 'PRI0') {
            copyArrBooks = copyArrBooks.filter((element) => {
                let price = element.price;
                if (element.discount !== 0) {
                    let discount = arrDiscounts.find((index) => {
                        return index.key === element.discount;
                    })
                    price = price * discount.valueEn / 100;
                }
                return price >= +value[0] && price <= +value[1]
            })
        }

        this.setState({
            arrBooks: copyArrBooks,
            filterPrice: item.key
        })
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
        let { arrCategories, arrPrices, arrBooks, filterPrice } = this.state;
        let arrDiscounts = this.props.discounts;
        let options = [{
            label: 'Bán Chạy Tuần',
        }, {
            label: 'Bán Chạy Tuần',
        }, {
            label: 'Bán Chạy Tuần',
        }];
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className='category-detail-container'>
                    <div className='breadcrumb'>
                        <div className='home'>Trang chủ</div>
                        <i className="fas fa-angle-right"></i>

                        {arrCategories && arrCategories.length > 0 &&
                            <div className='category-text'>
                                {arrCategories.find((item) => {
                                    return item.id === +this.props.match.params.id
                                }).categoryName}
                            </div>
                        }

                    </div>
                    <div className='main-content'>
                        <div className='sidebar'>
                            <div className='sidebar-item'>
                                <div className='heading'>NHÓM SẢN PHẨM</div>
                                <div className='text'>Danh mục</div>
                                <div className='body'>
                                    {arrCategories && arrCategories.length > 0 &&
                                        arrCategories.map((item, index) => {
                                            return (
                                                <div key={index}
                                                    className={item.id === +this.props.match.params.id ? 'body-item active' : 'body-item'}
                                                    onClick={() => this.handleOnClickCategory(item)}
                                                >{item.categoryName}</div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className='sidebar-item'>
                                <div className='heading'>Giá</div>
                                <div className='body'>
                                    {arrPrices && arrPrices.length > 0 &&
                                        arrPrices.map((item, index) => {
                                            let value = item.valueVi.split('-');
                                            return (
                                                <div key={index} className="form-check body-item">
                                                    <input className="form-check-input" type="radio" name="price" id={item.key}
                                                        checked={item.key === filterPrice}
                                                        onChange={() => this.handleChangeRadio(item)}
                                                    />
                                                    <label className="form-check-label" htmlFor={item.key}>
                                                        {value[0] === 'Tất cả' ? value[0] :
                                                            `${value[0]}đ - ${value[1] !== '9,999,999' ? value[1] + 'đ' : 'Trở lên'}`
                                                        }
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>
                        </div>
                        <div className='category-product'>
                            <div className='toolbar'>
                                <div className='text'>Sắp xếp theo :</div>
                                <div className='sort'>
                                    <Select
                                        value={this.state.selectedDiscount}
                                        onChange={(event) => this.handleChangeSelect(event, 'selectedDiscount')}
                                        options={options}
                                    />
                                </div>
                                <div className='sort'>
                                    <Select
                                        value={this.state.selectedDiscount}
                                        onChange={(event) => this.handleChangeSelect(event, 'selectedDiscount')}
                                        options={options}
                                    />
                                </div>
                            </div>
                            <div className='list-product'>
                                <div className='product-grid'>
                                    {arrBooks && arrBooks.length > 0
                                        && arrBooks.map((item, index) => {
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
                                                <div key={index} className='product-item' onClick={() => this.handleViewDetailBook(item)}>
                                                    {discount.valueVi !== '0' &&
                                                        <div className='product-sale'>
                                                            <div className='product-sale-discount'>
                                                                {discount.valueVi}%
                                                            </div>
                                                        </div>
                                                    }
                                                    <div className='product-img'>
                                                        <img src={imageBase64} />
                                                    </div>
                                                    <div className='product-name'>{item.name}</div>
                                                    {discount.valueVi !== '0' ?
                                                        <div className='product-price'>
                                                            <div className='product-price-new'>
                                                                <NumberFormat
                                                                    value={item.priceNew}
                                                                    displayType={'text'}
                                                                    thousandSeparator={true}
                                                                    suffix={'đ'}
                                                                />
                                                            </div>
                                                            <div className='product-price-odd'>
                                                                <NumberFormat
                                                                    value={item.price}
                                                                    displayType={'text'}
                                                                    thousandSeparator={true}
                                                                    suffix={'đ'}
                                                                />
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className='product-price'>
                                                            <div className='product-price-new'>
                                                                <NumberFormat
                                                                    value={item.price}
                                                                    displayType={'text'}
                                                                    thousandSeparator={true}
                                                                    suffix={'đ'}
                                                                />
                                                            </div>
                                                        </div>
                                                    }
                                                    <div className='product-add-to-car'
                                                        onClick={(event) => this.handleClickAddTOCar(event, item)}
                                                    >
                                                        Add to cart
                                                        <i className="fas fa-shopping-cart"></i>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
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
        categories: state.category.categories,
        discounts: state.book.discounts,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCategories: () => dispatch(actions.fetchAllCategories()),
        fetchDiscountStart: () => dispatch(actions.fetchDiscountStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailCategory));
