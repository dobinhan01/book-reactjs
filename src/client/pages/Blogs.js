import './Blogs.scss';
import { Link } from "react-router-dom";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllBlogs } from "../../redux/actions/blogAction";

const Blogs = () => {

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
    return (
        <div className="Blogs">
            <Breadcrumb
                children1='blog'
                navigate1='/blog'
            />
            <div className="blog-wrap container">
                {dataBlogs?.length > 0 && dataBlogs.map((blog, index) => {
                    let previewImg = new Buffer(blog?.img, 'base64').toString('binary');
                    return (
                        <div className="blog-item" key={index}>
                            <div className="header">
                                <div className="title">
                                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                                </div>
                                <div className="post-meta">
                                    <span className="author">By </span>
                                    <span >{blog.author}</span> on
                                    <span className="date"> {blog.date}</span>
                                    <span className="separator">|</span>
                                    <span className="tags">{blog.tag}</span>
                                </div>
                            </div>
                            <Link to={`/blogs/${blog.id}`} className="img">
                                <img src={previewImg} alt="" width='1199' height='700' />
                            </Link>
                            <div className="text">{blog.excerpt}</div>
                        </div>
                    )
                })
                }


            </div>
        </div>
    )
}

export default Blogs;