import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils'

import { changeLanguageApp } from '../../store/actions';

import bannerImg from '../../assets/banner/banner.jpg';

import Slider from "react-slick";

class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        let language = this.props.language;
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1
        }
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <div className='header-logo'></div>
                        </div>
                        <div className='center-content'>
                            <div className='header-search'>
                                <input type='text' placeholder='Tìm kiếm sản phẩm mong muốn' />
                                <label className=''><i className="fas fa-search"></i></label>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
                            </div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                            </div>
                            <div className='language'><i className="fas fa-globe"></i></div>
                            <div className='cart'><i className="fas fa-shopping-cart"></i></div>
                            <div className='user'><i className="fas fa-user-circle"></i></div>
                        </div>
                    </div>
                    <div className='home-header-nav'>
                        <div className='nav'>
                            <a href='#home'><FormattedMessage id="home-header.home" /></a>
                            <a href='#home'><FormattedMessage id="home-header.product" /></a>
                            <a href='#home'><FormattedMessage id="home-header.about" /></a>
                            <a href='#home'><FormattedMessage id="home-header.review" /></a>
                            <a href='#home'><FormattedMessage id="home-header.contact" /></a>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='home-header-banner-content'>
                        <div className='content-left'>
                            <h3><FormattedMessage id="banner.title" /></h3>
                            <p><FormattedMessage id="banner.desc" /></p>
                            <a href='#' className='btn'><FormattedMessage id="banner.button" /></a>
                        </div>
                        <div className='content-right'>
                            <div className='slider'>
                                <Slider {...settings}>
                                    <div className='slider-item'>
                                        <img src={bannerImg} />
                                    </div>
                                    <div className='slider-item'>
                                        <img src={bannerImg} />
                                    </div>
                                    <div className='slider-item'>
                                        <img src={bannerImg} />
                                    </div>
                                    <div className='slider-item'>
                                        <img src={bannerImg} />
                                    </div>
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
