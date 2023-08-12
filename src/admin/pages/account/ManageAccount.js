import './ManageAccount.scss';
import _ from 'lodash';
import { debounce } from 'lodash';
import TableAccount from '../../components/tables/TableAccount';
import ModalAddAccount from '../../components/modals/account/ModalAddAccount';
import ModalConfirm from '../../components/modals/account/ModalConfirm';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../../redux/actions/userAction';

const ManageAccount = () => {

    const dispatch = useDispatch();
    const { users } = useSelector(state => state.user);
    const [listAccount, setListAccount] = useState([]);

    const [isShowModalAddAccount, setIsShowModalAddAccount] = useState(false);
    const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
    const [dataAccountDelete, setDataAccountDelete] = useState({});

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch])
    useEffect(() => {
        setListAccount(users)
    }, [users])

    const handleClose = () => {
        setIsShowModalAddAccount(false);
        setIsShowModalConfirm(false);
    }

    const handleDeleteAccount = (account) => {
        setDataAccountDelete(account);
        setIsShowModalConfirm(true)
    }

    const handleSearch = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListAccount = _.cloneDeep(users);
            cloneListAccount = cloneListAccount.filter(item => item.username.includes(term))
            setListAccount(cloneListAccount)
        } else {
            dispatch(fetchAllUsers());
        }
    }, 500)

    return (
        <div className='ManageAccount' style={{ padding: '76px 16px 30px' }}>
            <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: '30px' }}>
                <h1 className="m-0">Tài khoản</h1>
                <button className='btn btn-success'
                    onClick={() => setIsShowModalAddAccount(true)}
                >
                    Thêm tài khoản mới
                </button>
            </div>
            <div className='search'>
                <div className='icon'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <input type='text' placeholder='Tìm kiếm theo tên tài khoản...'
                    onChange={(event) => handleSearch(event)}
                />
            </div>
            <TableAccount
                listAccount={listAccount}
                dataAccountDeleteFromChildToParent={handleDeleteAccount}
            />
            <ModalAddAccount
                show={isShowModalAddAccount}
                handleClose={handleClose}
            />
            <ModalConfirm
                show={isShowModalConfirm}
                handleClose={handleClose}
                dataAccountDelete={dataAccountDelete}
            />
        </div>
    )
}

export default ManageAccount;