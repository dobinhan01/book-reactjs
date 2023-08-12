import Author from '../Author';
import Slider from "react-slick";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllAuthors } from '../../../redux/actions/authorAction';

const Authors = (props) => {

    let settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    const dispatch = useDispatch();
    const { authors } = useSelector(state => state.author);
    const [listAuthor, setListAuthor] = useState([]);

    useEffect(() => {
        dispatch(fetchAllAuthors());
    }, [dispatch])

    useEffect(() => {
        setListAuthor(authors)
    }, [authors])

    return (
        <div className="section-container author">
            <div className="container">
                <div className="section-wrap">
                    <div className="heading">THIS MONTH'S</div>
                    <div className="title">Featured Authors</div>
                    <div className="desc">Hand picked by our expert Editors</div>
                    <div className="content">
                        <Slider {...settings}>
                            {listAuthor?.length > 0 &&
                                listAuthor.map((item, index) => {
                                    return (
                                        <Author key={index} item={item} />
                                    )
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authors;