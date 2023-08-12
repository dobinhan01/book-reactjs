import './Updates.scss';
import img1 from '../../../assets/images/author/author1.jpg';
import img2 from '../../../assets/images/author/author2.jpg';
import img3 from '../../../assets/images/author/author3.jpg';

const UpdatesData = [
    {
        img: img1,
        name: "Dane Wetton",
        noti: "đã đặt sách Tôi Tin Tôi Có Thể Làm Được: Học Cách Làm Người",
        time: "2 ngày trước",
    },
    {
        img: img2,
        name: "Ellie Thomson",
        noti: "đã đặt sách Cho Tôi Xin Một Vé Đi Tuổi Thơ",
        time: "3 ngày trước",
    },
    {
        img: img3,
        name: "Harry",
        noti: "đã đặt sách Nhà Lãnh Đạo Không Chức Danh",
        time: "3 ngày trước",
    },
]

const Updates = (props) => {
    return (
        <div className='updates-container'>
            {UpdatesData.map((update, index) => {
                return (
                    <div className="update" key={index}>
                        <img src={update.img} alt="profile" />
                        <div className="noti">
                            <div style={{ marginBottom: '0.5rem' }}>
                                <span>{update.name}</span>
                                <span> {update.noti}</span>
                            </div>
                            <span>{update.time}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Updates;