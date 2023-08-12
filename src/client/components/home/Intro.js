
import { Link } from 'react-router-dom';
import imgIntro from '../../../assets/images/intro.jpg'

const Intro = (props) => {

    return (<>
        <div className="info-container">
            <div className="info-wrap">
                <div className="col-6 left">
                    <img src={imgIntro} alt="" width="600" height="712" />
                    <div className='left-wrap'>
                        <div className='title'>Bán Độc Quyền Sách Mới</div>
                        <div className='desc'>Giảm giá 60% cho tất cả sách mới. Đăng ký ngay bây giờ để tận dụng ưu đãi.</div>
                        <Link to='/' className='btn'>Theo dõi ngay</Link>
                    </div>
                </div>
                <div className="col-6 content">
                    <div className='heading'>Hàng trăm thể loại sách</div>
                    <div className='title'>BookHouse có một danh mục lớn gồm 12 triệu cuốn sách trực tuyến</div>
                    <div className='desc'>
                        Giải phóng hiệu quả thông tin đa phương tiện mà không có giá trị đa phương tiện.
                        Nhanh chóng tối đa hóa sản phẩm kịp thời cho các lược đồ thời gian thực.
                        Duy trì đáng kể các giải pháp nhấp chuột mà không có các giải pháp chức năng.
                    </div>
                    <Link to='/products' className='btn'>Mua ngay</Link>
                </div>
            </div>
        </div>
    </>)
}

export default Intro;