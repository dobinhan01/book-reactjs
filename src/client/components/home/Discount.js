
import Slider from "react-slick";
import Countdown from "../countdown/Countdown";
import Product from '../Product'
import { useDispatch, useSelector } from "react-redux";
import { getProductsDiscount } from "../../../redux/actions/productAction";
import { useEffect, useState } from "react";

const Discount = (props) => {

    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };

    const dispatch = useDispatch();
    const { productsDiscount } = useSelector(state => state.product);
    const [listProductsHome, setListProductsHome] = useState([]);

    useEffect(() => {
        dispatch(getProductsDiscount(5, 'D5'));
    }, [dispatch]);

    useEffect(() => {
        setListProductsHome(productsDiscount)
    }, [productsDiscount]);

    return (
        <div className="section-container">
            <div className="container">
                <div className="section-wrap">
                    <div className="heading">GIẢM GIÁ 50%</div>
                    <div className="title">Ưu đãi trong tháng</div>
                    <div className="countdown-wrap">
                        <div className="countdown-center">
                            <Countdown />
                        </div>
                    </div>
                    <div className="content">
                        <Slider {...settings}>
                            {
                                listProductsHome?.map((item, index) => {
                                    return <Product item={item} key={index} />
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Discount;