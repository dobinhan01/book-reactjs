import './Contact.scss';
import _ from 'lodash';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableContact from '../../components/tables/TableContact';
import { fetchAllContacts } from '../../../redux/actions/contactAction';

const Contact = () => {

    const dispatch = useDispatch();
    const { contacts } = useSelector(state => state.contact);
    const [listContact, setListContact] = useState([]);

    useEffect(() => {
        dispatch(fetchAllContacts());
    }, [dispatch])
    useEffect(() => {
        setListContact(contacts)
    }, [contacts])

    const handleSearch = debounce((event) => {
        let term = event.target.value;
        if (term) {
            let cloneListContact = _.cloneDeep(listContact);
            cloneListContact = cloneListContact.filter(item => item.email.includes(term))
            setListContact(cloneListContact)
        } else {
            dispatch(fetchAllContacts());
        }
    }, 500)

    return (
        <div className='Contact' style={{ padding: '76px 16px 30px' }}>
            <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: '30px' }}>
                <h1 className="m-0">Liên hệ</h1>
            </div>
            <div className='search'>
                <div className='icon'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <input type='text' placeholder='Tìm kiếm liên hệ theo email...'
                    onChange={(event) => handleSearch(event)}
                />
            </div>
            <TableContact
                listContact={listContact}
            // dataCategoryDeleteFromChildToParent={handleDeleteCategory}
            />
            {/* <ModalConfirm
                show={isShowModalConfirm}
                handleClose={handleClose}
                dataCategoryDelete={dataCategoryDelete}
            /> */}
        </div>
    )
}

export default Contact;