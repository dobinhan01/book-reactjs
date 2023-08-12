import './Footer.scss'
import logo from '../../assets/images/logo.png'

const Footer = (props) => {
    return (
        <div className='footer-container'>
            <div className='footer-inner'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-3'>
                            <div className='logo'>
                                <img src={logo} alt='' width='805' height='168' />
                                <span>BOOK<span>HOUSE</span></span>
                            </div>
                            <div className='address'>
                                <div className='item'>
                                    <i className="fa-solid fa-location-dot"></i>
                                    <div className='desc'>Hà Đông, Hà Nội, Việt Nam</div>
                                </div>
                                <div className='item'>
                                    <i className="fa-solid fa-envelope"></i>
                                    <div className='desc'>dobinhan@gmail.com</div>
                                </div>
                                <div className='item'>
                                    <i className="fa-solid fa-phone"></i>
                                    <div className='desc'>0853138983</div>
                                </div>
                            </div>
                        </div>
                        <div className='col-3'>
                            <div className='heading'>
                                <h3>HỖ TRỢ KHÁCH HÀNG</h3>
                            </div>
                            <div className='menu'>
                                <ul>
                                    <li>Câu hỏi thường gặp</li>
                                    <li>Điều khoản dịch vụ</li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-3'>
                            <div className='heading'>
                                <h3>CHÍNH SÁCH</h3>
                            </div>
                            <div className='menu'>
                                <ul>
                                    <li>Chính sách bảo mật</li>
                                    <li>Chính sách thanh toán</li>
                                    <li>Chính sách vận chuyển</li>
                                    <li>Chính sách đổi trả</li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-3'>
                            <div className='heading'>
                                <h3>ĐĂNG KÝ NHẬN TIN</h3>
                            </div>
                            <div className='text'>
                                <p>Hãy nhập email của bạn vào ô dưới đây để có thể nhận được tất cả tin tức mới nhất.</p>
                                <div className='subscription'>
                                    <form>
                                        <input type='text' title='Enter your email here' placeholder='Nhập email của bạn vào đây' />
                                        <button type='submit'>
                                            <i className="fa-solid fa-paper-plane"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bottom'>©2023 BookHouse. Nền tảng bán sách hàng đầu Việt Nam.</div>
        </div>
    )
}

export default Footer;