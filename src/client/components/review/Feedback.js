import './Feedback.scss';
import imgAvatarDefault from '../../../assets/images/default-avatar.png';

const Feedback = (props) => {
    const { item } = props;
    const starts = Array(5).fill(0);

    const handleImg = (img) => {
        if (img) {
            return new Buffer(img, 'base64').toString('binary')
        }
        return imgAvatarDefault
    }

    return (
        <div className='Feedback'>
            <div className="user-info">
                <img src={handleImg(item.User.UserInfos.img)} alt='' width='25px' height='25px' />
                <span>{item.User.username}</span>
            </div>
            <div className="content">
                <span>{item.date}</span>
                <div className="stars">
                    {starts.map((_, index) => {
                        return (
                            <i key={index}
                                className={item.stars > index ? "fa-solid fa-star active" : "fa-solid fa-star"}
                            ></i>
                        )
                    })}
                </div>
                <div className='review'>{item.review}</div>
            </div>
        </div>
    )
}

export default Feedback; 