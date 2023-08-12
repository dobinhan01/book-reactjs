import './Contact.scss';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createContact } from '../../redux/actions/contactAction';

const Contact = () => {

    const dispatch = useDispatch();
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        const payload = { firstname, lastname, email, phone, subject, message };
        dispatch(createContact(payload));
        setFirstname('');
        setLastname('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
    }

    return (
        <div className='contact-container'>
            <Breadcrumb
                children1='Liên hệ'
                navigate1='/contact-us'
            />
            <div className='content'>
                <div className='left col-6'>
                    <h2 className='title'>Thông tin liên lạc</h2>
                    <p className='desc'>Chúng tôi luôn sẵn sàng 24/7</p>
                    <ul>
                        <li>
                            <div className='heading'>
                                <i className="fa-regular fa-paper-plane"></i>
                                <p>Trụ sở chính</p>
                            </div>
                            <div className='text'>
                                Quang Trung, Hà Đông, Hà Nội
                            </div>
                        </li>
                        <li>
                            <div className='heading'>
                                <i className="fa-solid fa-phone-volume"></i>
                                <p>Gọi cho chúng tôi</p>
                            </div>
                            <div className='text'>
                                Thứ Hai - Thứ Sáu: 10 giờ sáng - 8 giờ tối
                                <br />@ +123 124567890
                                <br />@ +123 789456123
                            </div>
                        </li>
                        <li>
                            <div className='heading'>
                                <i className="fa-solid fa-pen-nib"></i>
                                <p>Viết cho chúng tôi</p>
                            </div>
                            <div className='text'>
                                contact@dobinhan.com
                                <br />dobinhan@gmail.com
                            </div>
                        </li>
                    </ul>
                </div>
                <div className='right col-6'>
                    <div className='heading'>CẦN GIÚP ĐỠ?</div>
                    <h2 className='title'>Có một câu hỏi?</h2>
                    <p className='desc'>Chúng tôi luôn sẵn sàng 24/7</p>
                    <form>
                        <div className='form-group col-6'>
                            <label className="form-label">
                                Họ
                                <span className="wpforms-required-label">*</span>
                            </label>
                            <input type="email" className="form-control"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </div>
                        <div className='form-group col-6'>
                            <label className="form-label">
                                Tên
                                <span className="wpforms-required-label">*</span>
                            </label>
                            <input type="email" className="form-control"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>
                        <div className='form-group col-6'>
                            <label className="form-label">
                                Email
                                <span className="wpforms-required-label">*</span>
                            </label>
                            <input type="email" className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='form-group col-6'>
                            <label className="form-label">
                                Số điện thoại
                                <span className="wpforms-required-label">*</span>
                            </label>
                            <input type="text" className="form-control"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className='form-group col-12'>
                            <label className="form-label">
                                Subject
                                <span className="wpforms-required-label">*</span>
                            </label>
                            <input type="text" className="form-control"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </div>
                        <div className='form-group col-12'>
                            <label className="form-label">
                                Message
                                <span className="wpforms-required-label">*</span>
                            </label>
                            <textarea type="text" className="form-control"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            ></textarea>
                        </div>
                    </form>
                    <button className='btn'
                        onClick={() => handleSubmit()}
                    >Gửi</button>
                </div>
            </div>
        </div>
    )
}

export default Contact;