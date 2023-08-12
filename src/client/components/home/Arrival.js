
import Slider from "react-slick";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "../Product";
import { getProductsHome } from '../../../redux/actions/productAction';
import { fetchAllcode } from '../../../redux/actions/userAction';

const Arrival = (props) => {

    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        draggable: false
    };

    const dispatch = useDispatch();
    const { productsHome } = useSelector(state => state.product);
    const [listProducts, setListProducts] = useState([]);
    const { allcodes } = useSelector(state => state.user);
    const [discounts, setDiscounts] = useState([]);

    useEffect(() => {
        dispatch(getProductsHome(5));
        dispatch(fetchAllcode());
    }, [dispatch]);


    useEffect(() => {
        if (productsHome) {
            setListProducts(productsHome)
        }
    }, [productsHome]);

    useEffect(() => {
        if (allcodes) {
            setDiscounts(allcodes.discounts);
        }
    }, [allcodes])

    return (<>
        <div className="section-container">
            <div className="container">
                <div className="section-wrap">
                    <div className="heading">SÁCH MỚI</div>
                    <div className="title">Sách mới</div>
                    <div className="desc">Đọc sách giúp bạn phát triển kỹ năng giao tiếp</div>
                    <div className="content">
                        <Slider {...settings}>
                            {
                                listProducts?.map((item, index) => {
                                    return <Product key={index} item={item} discounts={discounts} />
                                })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Arrival;