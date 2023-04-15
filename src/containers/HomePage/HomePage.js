import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import HomeFooter from './HomeFooter';
import FlashSale from './Section/FlashSale';
import Trend from './Section/Trend';
import Literature from './Section/Literature';
import Economy from './Section/Economy';
import Psychological from './Section/Psychological';
import './HomePage.scss';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
        }
        return (
            <div>
                <HomeHeader isShowBanner={true} />
                <FlashSale
                    settings={settings}
                />
                <Trend
                    settings={settings}
                />
                <Literature
                    settings={settings}
                />
                <Economy
                    settings={settings}
                />
                <Psychological
                    settings={settings}
                />
                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
