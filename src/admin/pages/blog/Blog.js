import './Blog.scss';
import _ from 'lodash';
import { debounce } from 'lodash';
import { Modal, Button } from 'react-bootstrap';
import TableBlog from '../../components/tables/TableBlog';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteBlog, fetchAllBlogs } from '../../../redux/actions/blogAction';

const Blog = () => {

    const dispatch = useDispatch();
    const navigator = useNavigate();
    const { blogs } = useSelector(state => state.blog);
    const [listBlog, setListBlog] = useState([]);
    const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
    const [dataBlogDelete, setDataBlogDelete] = useState({});

    useEffect(() => {
        dispatch(fetchAllBlogs());
    }, [dispatch])
    useEffect(() => {
        setListBlog(blogs)
    }, [blogs])

    const handleClose = () => {
        setIsShowModalConfirm(false);
    }

    const handleDeleteBlog = (blog) => {
        setDataBlogDelete(blog);
        setIsShowModalConfirm(true)
    }

    const handleConfirmDelete = async (blog) => {
        await dispatch(deleteBlog(dataBlogDelete.id));
        handleClose();
    }

    const handleSearch = debounce((event) => {
        let term = event.target.value.toLowerCase();
        if (term) {
            let cloneListBlog = _.cloneDeep(blogs);
            cloneListBlog = cloneListBlog.filter(item => item.title.toLowerCase().includes(term))
            setListBlog(cloneListBlog)
        } else {
            dispatch(fetchAllBlogs());
        }
    }, 500)

    return (
        <div className='Blog' style={{ padding: '76px 16px 30px' }}>
            <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: '30px' }}>
                <h1 className="m-0">Blog</h1>
                <button className='btn btn-success'
                    onClick={() => navigator('/admin/blog/add')}
                >
                    Thêm blog mới
                </button>
            </div>
            <div className='search'>
                <div className='icon'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <input type='text' placeholder='Tìm kiếm blog theo tiêu đề...'
                    onChange={(event) => handleSearch(event)}
                />
            </div>
            <TableBlog
                listBlog={listBlog}
                dataBlogDeleteFromChildToParent={handleDeleteBlog}
            />
            <Modal
                show={isShowModalConfirm}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Xóa blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        Hành động này không thể được hoàn tác! Bạn có muốn xóa blog này?
                        <br />
                        <b>Tiêu đề = {dataBlogDelete.title}</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => handleConfirmDelete()}>
                        Đồng ý
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Blog;