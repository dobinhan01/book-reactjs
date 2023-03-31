import React, { Component } from 'react';
import { connect } from 'react-redux';
import './FlashSale.scss';

import Slider from "react-slick";

import flashsaleImg from '../../../assets/flashsale.jpg';

class FlashSale extends Component {

    render() {
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
                                <div className='section-slider-item'>
                                    <div className='section-slider-sale'>
                                        <div className='section-slider-sale-discount'>50%</div>
                                    </div>
                                    <div className='section-slider-img'>
                                        <img src={flashsaleImg} />
                                    </div>
                                    <div className='section-slider-name'>Muốn Có Gấu, Phải Phấn Đấu Muốn Có Gấu, Phải Phấn Đấu Muốn Có Gấu, Phải Phấn Đấu</div>
                                    <div className='section-slider-price'>
                                        <div className='section-slider-price-new'>37.500</div>
                                        <div className='section-slider-price-odd'>75.000</div>
                                        <div className='section-slider-episode'>Tập 1</div>
                                    </div>
                                    <div className='progress'>
                                        <div className='progress-value'>Đã bán 12</div>
                                    </div>
                                </div>
                                <div className='section-slider-item'>
                                    <div className='section-slider-sale'>
                                        <div className='section-slider-sale-discount'>50%</div>
                                    </div>
                                    <div className='section-slider-img'>
                                        <img src={flashsaleImg} />
                                    </div>
                                    <div className='section-slider-name'>Muốn Có Gấu, Phải Phấn Đấu2222222222222222222222222</div>
                                    <div className='section-slider-price'>
                                        <div className='section-slider-price-new'>37.500</div>
                                        <div className='section-slider-price-odd'>75.000</div>
                                        <div className='section-slider-episode'>Tập 1</div>
                                    </div>
                                    <div className='progress'>
                                        <div className='progress-value'>Đã bán 12</div>
                                    </div>
                                </div>
                                <div className='section-slider-item'>
                                    <div className='section-slider-sale'>
                                        <div className='section-slider-sale-discount'>50%</div>
                                    </div>
                                    <div className='section-slider-img'>
                                        <img src={flashsaleImg} />
                                    </div>
                                    <div className='section-slider-name'>Muốn Có Gấu, Phải Phấn Đấu3333333333333333333333333333</div>
                                    <div className='section-slider-price'>
                                        <div className='section-slider-price-new'>37.500</div>
                                        <div className='section-slider-price-odd'>75.000</div>
                                        <div className='section-slider-episode'>Tập 1</div>
                                    </div>
                                    <div className='progress'>
                                        <div className='progress-value'>Đã bán 12</div>
                                    </div>
                                </div>
                                <div className='section-slider-item'>
                                    <div className='section-slider-sale'>
                                        <div className='section-slider-sale-discount'>50%</div>
                                    </div>
                                    <div className='section-slider-img'>
                                        <img src={flashsaleImg} />
                                    </div>
                                    <div className='section-slider-name'>Muốn Có Gấu, Phải Phấn Đấu44444444444444444444</div>
                                    <div className='section-slider-price'>
                                        <div className='section-slider-price-new'>37.500</div>
                                        <div className='section-slider-price-odd'>75.000</div>
                                        <div className='section-slider-episode'>Tập 1</div>
                                    </div>
                                    <div className='progress'>
                                        <div className='progress-value'>Đã bán 12</div>
                                    </div>
                                </div>
                                <div className='section-slider-item'>
                                    <div className='section-slider-sale'>
                                        <div className='section-slider-sale-discount'>50%</div>
                                    </div>
                                    <div className='section-slider-img'>
                                        <img src={flashsaleImg} />
                                    </div>
                                    <div className='section-slider-name'>Muốn Có Gấu, Phải Phấn Đấu55555555555555555555555</div>
                                    <div className='section-slider-price'>
                                        <div className='section-slider-price-new'>37.500</div>
                                        <div className='section-slider-price-odd'>75.000</div>
                                        <div className='section-slider-episode'>Tập 1</div>
                                    </div>
                                    <div className='progress'>
                                        <div className='progress-value'>Đã bán 12</div>
                                    </div>
                                </div>
                                <div className='section-slider-item'>
                                    <div className='section-slider-sale'>
                                        <div className='section-slider-sale-discount'>50%</div>
                                    </div>
                                    <div className='section-slider-img'>
                                        <img src={flashsaleImg} />
                                    </div>
                                    <div className='section-slider-name'>Muốn Có Gấu, Phải Phấn Đấu</div>
                                    <div className='section-slider-price'>
                                        <div className='section-slider-price-new'>37.500</div>
                                        <div className='section-slider-price-odd'>75.000</div>
                                        <div className='section-slider-episode'>Tập 1</div>
                                    </div>
                                    <div className='progress'>
                                        <div className='progress-value'>Đã bán 12</div>
                                    </div>
                                </div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlashSale);
