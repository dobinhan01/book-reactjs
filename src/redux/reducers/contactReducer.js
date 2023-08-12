import { FETCH_ALL_CONTACTS_SUCCESS, FETCH_ALL_CONTACTS_ERROR } from '../actions/contactAction'

const INITIAL_STATE = {
    contacts: []
};

const contactReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ALL_CONTACTS_SUCCESS:
            return {
                ...state,
                contacts: action.data
            }
        case FETCH_ALL_CONTACTS_ERROR:
            return {
                ...state,
                contacts: []
            }
        default: return state;
    }
}

export default contactReducer;