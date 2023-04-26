import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils'
import { changeLanguageApp } from '../../store/actions';
import bannerImg from '../../assets/banner/banner.jpg';
import stand from '../../assets/stand.png';
import Slider from "react-slick";
import * as actions from '../../store/actions';
import { withRouter } from 'react-router';
import slugify from 'react-slugify';

class HomeHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrCategories: []
        }
    }

    componentDidMount() {
        this.props.fetchCategoryHome();
    }

    componentDidUpdate(prevProps, prevState, snaphot) {
        if (prevProps.categoriesHome !== this.props.categoriesHome) {
            this.setState({
                arrCategories: this.props.categoriesHome
            })
        }
    }

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language);
    }

    returnToHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`);
        }
    }

    handleViewDetailCart = () => {
        let userId = this.props.userInfo.id;
        if (this.props.history) {
            this.props.history.push(`/cart/${userId}`);
        }
    }

    handleViewDetailCategory = (item) => {
        // let slug = slugify(item.categoryName);
        if (this.props.history) {
            this.props.history.push(`/detail-category/${item.id}`);
        }
    }

    render() {
        let language = this.props.language;
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1
        };
        let { arrCategories } = this.state;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <div className='header-logo' onClick={() => this.returnToHome()}></div>
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
                            <div className='cart'
                                onClick={() => this.handleViewDetailCart()}
                            ><i className="fas fa-shopping-cart"></i></div>
                            <div className='user'><i className="fas fa-user-circle"></i></div>
                        </div>
                    </div>
                    <div className='home-header-nav'>
                        <div className='nav'>
                            <div onClick={() => this.returnToHome()} className='nav-item'><FormattedMessage id="home-header.home" /></div>
                            <div className='nav-item'>
                                <FormattedMessage id="home-header.product" />
                                <i className="fas fa-caret-down"></i>
                                <div className='subnav'>
                                    {arrCategories && arrCategories.length > 0
                                        && arrCategories.map((item, index) => {
                                            return (
                                                <div key={index} className='subnav-item'
                                                    onClick={() => this.handleViewDetailCategory(item)}
                                                >{item.categoryName}</div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <a href='#home' className='nav-item'><FormattedMessage id="home-header.about" /></a>
                            <a href='#home' className='nav-item'><FormattedMessage id="home-header.review" /></a>
                            <a href='#home' className='nav-item'><FormattedMessage id="home-header.contact" /></a>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
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
                                <img src={stand} className='stand' />
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
        categoriesHome: state.category.categoriesHome,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
        fetchCategoryHome: () => dispatch(actions.fetchCategoryHome()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
