import React, { Component } from 'react';
import { connect } from 'react-redux'

import Slider from "react-slick";

import flashsaleImg from '../../../assets/flashsale.jpg';

class Literature extends Component {

    render() {
        let settings = {
            ...this.props.settings,
            rows: 2
        }
        return (
            <div className='section-share section-flashsale'>
                <div className='section-container'>
                    <div className='section-header'>
                        <div className='section-header-top'>
                            <div className='section-icon'></div>
                            <div className='section-title'>VĂN HỌC</div>
                        </div>
                        <div className='section-header-nav'>
                            <ul className="nav-list">
                                <li className="nav-item active">Tiểu thuyết</li>
                                <li className="nav-item">Light Novel</li>
                                <li className="nav-item">Truyện ngắn - Tản văn</li>
                                <li className="nav-item">Ngôn tình</li>
                            </ul>
                        </div>
                    </div>
                    <div className='section-content'>
                        <div className='section-slider'>
                            <Slider {...settings}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Literature);
