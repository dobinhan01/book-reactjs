
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllBlogs } from "../../../redux/actions/blogAction";
import { Link } from "react-router-dom";

const Blogs = (props) => {

    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

    const dispatch = useDispatch();
    const { blogs } = useSelector(state => state.blog);
    const [dataBlogs, setDataBlogs] = useState([]);

    useEffect(() => {
        dispatch(fetchAllBlogs());
    }, [dispatch])

    useEffect(() => {
        if (blogs) {
            setDataBlogs(blogs)
        }
    }, [blogs])

    return (<>
        <div className="section-container blog">
            <div className="container">
                <div className="section-wrap">
                    <div className="heading">TIẾP TỤC CẬP NHẬT</div>
                    <div className="title">Cập nhật mới nhất</div>
                    <div className="desc">Các blog gần đây</div>
                    <div className="content">
                        <Slider {...settings}>
                            {dataBlogs?.length > 0 && dataBlogs.map((blog, index) => {
                                let previewImg = new Buffer(blog?.img, 'base64').toString('binary');
                                return (
                                    <div className="item-wrap" key={index}>
                                        <div className="item">
                                            <div className="image">
                                                <img src={previewImg} alt="" width="400" height="250" />
                                            </div>
                                            <div className="info">
                                                <div className="title">{blog.title}</div>
                                                <div className="desc">{blog.excerpt}</div>
                                                <Link to={`/blogs/${blog.id}`} className="btn">Xem thêm</Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Blogs;