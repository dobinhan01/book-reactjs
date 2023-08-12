import './Profile.scss';
import imgAvatarDefault from '../../../assets/images/default-avatar.png';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import CommonUtils from '../../../utils/CommonUtils';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUserInfo, putUserInfo } from '../../../redux/actions/userAction';
import Order from './Order';

const Profile = (props) => {

    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.auth);
    const { userInfo } = useSelector(state => state.user);

    const [isShowTab, setIsShowTab] = useState('account');
    const [payload, setPayload] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        img: ''
    });

    useEffect(() => {
        dispatch(getUserInfo(currentUser.id));
    }, [dispatch, currentUser])

    useEffect(() => {
        setPayload({
            firstName: userInfo.firstName || '',
            lastName: userInfo.lastName || '',
            email: userInfo.email || '',
            phone: userInfo.phone || '',
            address: userInfo.address || '',
            img: userInfo.img || imgAvatarDefault
        })
    }, [userInfo])

    const handleUpdate = () => {
        dispatch(putUserInfo(currentUser.id, payload))
    }

    const handleCancel = () => {
        setPayload({
            firstName: userInfo.firstName || '',
            lastName: userInfo.lastName || '',
            email: userInfo.email || '',
            phone: userInfo.phone || '',
            address: userInfo.address || '',
            img: userInfo.img || ''
        })
    }

    const handlePreviewImg = (img) => {
        if (typeof img === 'string') {
            return img
        } else {
            return new Buffer(img, 'base64').toString('binary')
        }
    }

    const handleChangeImg = async (event) => {
        let file = event.target.files[0];

        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            setPayload({ ...payload, img: base64 });
        }
    }

    return (
        <div className='Profile'>
            <Breadcrumb
                children1='Tài khoản'
                navigate1='/profile'
            />
            <div className='container my-5'>
                <div className="bg-white shadow rounded-lg d-block d-sm-flex">
                    <div className="profile-tab-nav border-right">
                        <div className="p-4">
                            <div className="img-circle text-center mb-3">
                                <img src={handlePreviewImg(payload.img || imgAvatarDefault)} alt='' className="shadow" />
                                <label className='icon' htmlFor="file">
                                    <i className='bx bx-pencil'></i>
                                </label>
                                <input type="file" id="file" hidden
                                    onChange={(event) => handleChangeImg(event)}
                                />
                            </div>
                            <h4 className="text-center">{userInfo.username}</h4>
                        </div>
                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <div className={isShowTab === 'account' ? 'nav-link active' : 'nav-link'} id="account-tab"
                                onClick={() => setIsShowTab('account')}
                            >
                                <i className="fa fa-home text-center mr-1"></i>
                                Tài khoản
                            </div>
                            <div className={isShowTab === 'order' ? 'nav-link active' : 'nav-link'} id="order-tab"
                                onClick={() => setIsShowTab('order')}
                            >
                                <i className="fa fa-user text-center mr-1"></i>
                                Đơn hàng
                            </div>
                            <div className={isShowTab === 'notification' ? 'nav-link active' : 'nav-link'} id="notification-tab"
                                onClick={() => setIsShowTab('notification')}
                            >
                                <i className="fa fa-bell text-center mr-1"></i>
                                Thông báo
                            </div>
                        </div>
                    </div>
                    <div className="tab-content p-4 p-md-5" id="v-pills-tabContent">
                        <div className={isShowTab === 'account' ? 'tab-pane fade show active' : 'tab-pane fade'}>
                            <h3 className="mb-4">Cập nhật tài khoản</h3>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Họ</label>
                                        <input type="text" className="form-control"
                                            value={payload.firstName}
                                            onChange={(event) => setPayload({ ...payload, firstName: event.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Tên</label>
                                        <input type="text" className="form-control"
                                            value={payload.lastName}
                                            onChange={(event) => setPayload({ ...payload, lastName: event.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="text" className="form-control"
                                            disabled
                                            value={payload.email}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Số điện thoại</label>
                                        <input type="text" className="form-control"
                                            value={payload.phone}
                                            onChange={(event) => setPayload({ ...payload, phone: event.target.value })}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Địa chỉ</label>
                                        <input type="text" className="form-control"
                                            value={payload.address}
                                            onChange={(event) => setPayload({ ...payload, address: event.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-primary me-3"
                                    onClick={() => handleUpdate()}
                                >Cập nhật</button>
                                <button className="btn btn-light"
                                    onClick={() => handleCancel()}
                                >Hủy</button>
                            </div>
                        </div>
                        {/* <div className={isShowTab === 'password' ? 'tab-pane fade show active' : 'tab-pane fade'}>
                            <h3 className="mb-4">Password Settings</h3>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Old password</label>
                                        <input type="password" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>New password</label>
                                        <input type="password" className="form-control" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Confirm new password</label>
                                        <input type="password" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-primary">Update</button>
                                <button className="btn btn-light">Cancel</button>
                            </div>
                        </div> */}
                        <div className={isShowTab === 'order' ? 'tab-pane fade show active' : 'tab-pane fade'}>
                            <h3 className="mb-4">Đơn hàng</h3>
                            <Order id={currentUser.id} />
                        </div>
                        {/* <div className={isShowTab === 'application' ? 'tab-pane fade show active' : 'tab-pane fade'}>
                            <h3 className="mb-4">Application Settings</h3>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="app-check" />
                                            <label className="form-check-label" htmlFor="app-check">
                                                App check
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck2" />
                                            <label className="form-check-label" htmlFor="defaultCheck2">
                                                Lorem ipsum dolor sit.
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-primary">Update</button>
                                <button className="btn btn-light">Cancel</button>
                            </div>
                        </div>
                        <div className={isShowTab === 'notification' ? 'tab-pane fade show active' : 'tab-pane fade'}>
                            <h3 className="mb-4">Notification Settings</h3>
                            <div className="form-group">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="notification1" />
                                    <label className="form-check-label" htmlFor="notification1">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum accusantium accusamus, neque cupiditate quis
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="notification2" />
                                    <label className="form-check-label" htmlFor="notification2">
                                        hic nesciunt repellat perferendis voluptatum totam porro eligendi.
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="notification3" />
                                    <label className="form-check-label" htmlFor="notification3">
                                        commodi fugiat molestiae tempora corporis. Sed dignissimos suscipit
                                    </label>
                                </div>
                            </div>
                            <div>
                                <button className="btn btn-primary">Update</button>
                                <button className="btn btn-light">Cancel</button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Profile;