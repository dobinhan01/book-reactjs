import './BlogDetail.scss';
import { useLocation } from "react-router-dom";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchBlogById } from "../../redux/actions/blogAction";

const BlogDetail = () => {

    const location = useLocation();
    const blogId = location.pathname.split('/')[2];
    const dispatch = useDispatch();
    const { blogById } = useSelector(state => state.blog);
    const [dataBlog, setDataBlog] = useState([]);

    useEffect(() => {
        dispatch(fetchBlogById(blogId));
    }, [dispatch, blogId])

    useEffect(() => {
        if (blogById) {
            setDataBlog(blogById)
        }
    }, [blogById])

    return (
        <div className="BlogDetail">
            <Breadcrumb
                children1={dataBlog.title}
                navigate1={`/blogs/${dataBlog.id}`}
                children2='blog'
                navigate2='/blog'
            />
            <div className="content container">
                <div dangerouslySetInnerHTML={{ __html: dataBlog.contentHTML }}></div>
            </div>
        </div>
    )
}

export default BlogDetail;