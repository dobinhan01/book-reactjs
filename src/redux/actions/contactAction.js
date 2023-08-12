
import { toast } from 'react-toastify';
import { getAllContactsService, createContactService, deleteContactService } from '../../services/ContactService';

export const FETCH_ALL_CONTACTS_SUCCESS = 'FETCH_ALL_CONTACTS_SUCCESS';
export const FETCH_ALL_CONTACTS_ERROR = 'FETCH_ALL_CONTACTS_ERROR';

export const fetchAllContacts = () => {
    return async (dispatch, getState) => {
        let res = await getAllContactsService();
        if (res?.errCode === 0) {
            dispatch({
                type: FETCH_ALL_CONTACTS_SUCCESS,
                data: res.data
            })
        } else {
            dispatch({
                type: FETCH_ALL_CONTACTS_ERROR
            })
        }
    }
}

export const createContact = (payload) => {
    return async (dispatch, getState) => {
        let res = await createContactService(payload);
        if (res?.errCode === 0) {
            toast.success('Question submitted successfully');
            dispatch(fetchAllContacts());
        } else {
            toast.error(res.message)
        }
    }
}

export const deleteContact = (id) => {
    return async (dispatch, getState) => {
        let res = await deleteContactService(id);
        if (res?.errCode === 0) {
            toast.success('Question deleted successfully');
            dispatch(fetchAllContacts());
        } else {
            toast.error(res.message)
        }
    }
}