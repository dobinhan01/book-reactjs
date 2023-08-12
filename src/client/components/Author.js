import './Author.scss';

const Author = (props) => {

    const { item } = props;

    const handleChangeImg = (img) => {
        return new Buffer(img, 'base64').toString('binary');
    }

    return (
        <div className="author-wrap">
            <div className="author">
                <div className="avatar">
                    <img src={handleChangeImg(item.img)} alt='' width="150" height="150" />
                </div>
                <div className="info">
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                </div>
                <div className='social'>
                    <i className="fa-brands fa-twitter"></i>
                    <i className="fa-brands fa-instagram"></i>
                    <i className="fa-brands fa-linkedin"></i>
                    <i className="fa-brands fa-tumblr"></i>
                    <i className="fa-brands fa-spotify"></i>
                </div>
            </div>
        </div>
    )
}

export default Author;