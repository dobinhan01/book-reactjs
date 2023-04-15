import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../HomePage/HomeHeader';
import './DetailBook.scss';
import { getDetaiInfoBook } from '../../services/bookService';

class DetailBook extends Component {

    constructor(props) {
        super(props)
        this.state = {
            detailBook: [],
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetaiInfoBook(id)
            if (res && res.data) {
                this.setState({
                    detailBook: res.data
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snaphot) {

    }

    render() {
        let { detailBook } = this.state
        console.log('dobinhan', this.state)
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className='book-detail-container'>
                    <div className='view-book'>
                        <div className='content-left'>
                            <div className='image-book' style={{ backgroundImage: `url(${detailBook && detailBook.image ? detailBook.image : ''})` }}></div>
                            <div className='add-book'>
                                <button className='btn-add-cart'>
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
                            <div className='price-book'>
                                {detailBook && detailBook.price && <div className='price-new'>{detailBook.price}đ</div>}
                                {detailBook && detailBook.priceOld && <div className='price-old'>{detailBook.priceOld}đ</div>}
                                {detailBook && detailBook.discount && <div className='discount'>{detailBook.discount}</div>}
                            </div>
                            <div className='policy-book'>
                                <div>Chính sách đổi trả:</div>
                                <div>Đổi trả sản phẩm trong 30 ngày</div>
                            </div>
                            <div className='quantity-book'>
                                <span>Số lượng:</span>
                                <div className='quantity-box'>
                                    <div className='minus'>
                                        <i className="fas fa-minus"></i>
                                    </div>
                                    <div className='quantity'>1</div>
                                    <div className='plus'>
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
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailBook);
