
import Slider from "react-slick";
import imgBanner1 from '../../../assets/images/banner/banner1.png'
import imgBanner2 from '../../../assets/images/banner/banner2.png'
import imgBanner3 from '../../../assets/images/banner/banner3.png'
import bgBanner from '../../../assets/images/banner/bg-banner.png'
import { Link } from "react-router-dom";

const Banner = (props) => {

    let settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000
    };

    return (
        <div className="banner-container">
            <div className="banner-wrap" style={{ backgroundImage: `url(${bgBanner})` }}>
                <Slider {...settings}>
                    <div>
                        <div className="container">
                            <div className='row'>
                                <div className='col-6 content'>
                                    <div className='heading'>
                                        Danh mục lớn nhất
                                    </div>
                                    <div className='title'>
                                        Hơn<span>12 Triệu</span><br />Cuốn Sách
                                    </div>
                                    <p>
                                        Bắt đầu hành trình học tập cả bạn từ hàng triệu
                                        <br />cuốn sách của chúng tôi
                                    </p>
                                    <Link to={'/products'} className='btn'>Mua ngay</Link>
                                </div>
                                <div className='col-6'>
                                    <img src={imgBanner2} alt="" className='banner-img' />
                                </div>
                            </div>
                        </div></div>
                    <div>
                        <div className="container">
                            <div className='row'>
                                <div className='col-6 content'>
                                    <div className='heading'>
                                        Tìm kiếm sách dễ dàng
                                    </div>
                                    <div className='title'>
                                        Tìm Kiếm
                                        <span><br />ISBN</span>
                                    </div>
                                    <p>
                                        Tìm kiếm sách sử dụng số ISBN hoặc tên tác giả
                                        <br /> và tiết kiệm thời gian của bạn
                                    </p>
                                    <Link to={'/products'} className='btn'>Mua ngay</Link>
                                </div>
                                <div className='col-6'>
                                    <img src={imgBanner1} alt="" className='banner-img' />
                                </div>
                            </div>
                        </div></div>
                    <div>
                        <div className="container">
                            <div className='row'>
                                <div className='col-6 content'>
                                    <div className='heading'>
                                        Khuyến mãi khủng
                                    </div>
                                    <div className='title'>
                                        Giảm giá
                                        <br />đến<span>50%</span>
                                    </div>
                                    <p>
                                        Giảm giá 50% cho tất cả sách mới
                                        <br />chỉ có tại BookHouse
                                    </p>
                                    <Link to={'/products'} className='btn'>Mua ngay</Link>
                                </div>
                                <div className='col-6'>
                                    <img src={imgBanner3} alt="" className='banner-img' />
                                </div>
                            </div>
                        </div></div>
                </Slider>
                <div className='banner-bottom container'>
                    <div className='row'>
                        <div className='col-3 item'>
                            <div className='left'>
                                <i className="fa-solid fa-book-open"></i>
                            </div>
                            <div className='right'>
                                <h2>Danh mục sách lớn</h2>
                                <p>Hơn triệu cuốn sách</p>
                            </div>
                        </div>
                        <div className='col-3 item'>
                            <div className='left'>
                                <i className="fa-regular fa-comments"></i>
                            </div>
                            <div className='right'>
                                <h2>MIỄN PHÍ VẬN CHUYỂN</h2>
                                <p>TẤT CẢ TRÊN THẾ GIỚI</p>
                            </div>
                        </div>
                        <div className='col-3 item'>
                            <div className='left'>
                                <i className="fa-solid fa-rotate-right"></i>
                            </div>
                            <div className='right'>
                                <h2>30 NGÀY TRẢ LẠI</h2>
                                <p>CHÍNH SÁCH ĐỔI TRẢ ĐƠN GIẢN</p>
                            </div>
                        </div>
                        <div className='col-3 item'>
                            <div className='left'>
                                <i className="fa-solid fa-shield"></i>
                            </div>
                            <div className='right'>
                                <h2>THANH TOÁN ĐẢM BẢO</h2>
                                <p>GIAO DỊCH ĐẢM BẢO</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Banner;