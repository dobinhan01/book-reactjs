
import { Button, Form } from 'react-bootstrap';
import CommonUtils from '../../../utils/CommonUtils';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { fetchBlogById, updateBlog } from '../../../redux/actions/blogAction';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const EditBlog = () => {

    const location = useLocation();
    const blogId = location.pathname.split('/')[4];
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { blogById } = useSelector(state => state.blog);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [tag, setTag] = useState('');
    const [img, setImg] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [contentHTML, setContentHTML] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');

    useEffect(() => {
        dispatch(fetchBlogById(blogId));
    }, [dispatch, blogId])

    useEffect(() => {
        if (blogById) {
            let previewImg = new Buffer(blogById.img, 'base64').toString('binary')
            setTitle(blogById.title);
            setAuthor(blogById.author);
            setTag(blogById.tag);
            setImg(previewImg);
            setExcerpt(blogById.excerpt);
            setContentHTML(blogById.contentHTML);
            setContentMarkdown(blogById.contentMarkdown);
        }
    }, [blogById])

    const handleChangeImg = async (event) => {
        let file = event.target.files[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            setImg(base64);
        }
    }

    const mdParser = new MarkdownIt();
    const handleEditorChange = ({ html, text }) => {
        setContentHTML(html);
        setContentMarkdown(text);
    }

    const handleClick = () => {
        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const current = new Date();
        const date = `${month[current.getMonth()]} ${current.getDate()}, ${current.getFullYear()}`;
        const payload = { title, author, date, tag, img, excerpt, contentHTML, contentMarkdown };
        dispatch(updateBlog(blogId, payload, navigate));
    }

    return (
        <div className="EditBlog" style={{ padding: '76px 16px 30px' }}>
            <h1 className="m-0">Edit blog</h1>
            <Form.Group className="mb-3 col-6">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Title..."
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3 d-flex flex-column">
                <Form.Label>Image</Form.Label>
                <Form.Label className="file-upload" htmlFor="file">
                    {!img ?
                        <div className='file-upload-wrap'>
                            <div className="icon">
                                <i className="fa-regular fa-file-image"></i>
                            </div>
                            <div className="text">
                                <span>Click to upload image</span>
                            </div>
                        </div>
                        :
                        <div className='file-upload-wrap'>
                            <img src={img} alt='' height='140' />
                        </div>
                    }
                </Form.Label>
                <Form.Control type="file" id="file" hidden
                    onChange={(event) => handleChangeImg(event)}
                />
            </Form.Group>
            <Form.Group className="mb-3 col-6">
                <Form.Label>Author</Form.Label>
                <Form.Control type="text" placeholder="Author..."
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3 col-6">
                <Form.Label>Tag</Form.Label>
                <Form.Control type="text" placeholder="Tag..."
                    value={tag}
                    onChange={(event) => setTag(event.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3 col-6">
                <Form.Label>Excerpt</Form.Label>
                <Form.Control type="text" placeholder="Excerpt..."
                    value={excerpt}
                    onChange={(event) => setExcerpt(event.target.value)}
                />
            </Form.Group>
            <MdEditor style={{ height: '500px', marginBottom: '20px' }}
                renderHTML={text => mdParser.render(text)}
                onChange={handleEditorChange}
                value={contentMarkdown}
            />
            <Button variant="primary"
                onClick={() => handleClick()}
            >Edit blog</Button>
        </div>
    )
}

export default EditBlog;