
import Slider from "react-slick";
import Product from "../Product";

const Book = (props) => {

    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };

    return (<>
        <div className="section-container">
            <div className="container">
                <div className="section-wrap">
                    <div className="heading">TOP RATED</div>
                    <div className="title">Featured Books</div>
                    <div className="desc">Best rated books by our customers</div>
                    <div className="content">
                        <Slider {...settings}>
                            <Product />
                            <Product />
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Book;