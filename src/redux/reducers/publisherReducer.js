import { FETCH_PUBLISHER, FETCH_PUBLISHER_SUCCESS, FETCH_PUBLISHER_ERROR } from '../actions/publisherAction'

const INITIAL_STATE = {
    publishers: null
};

const publisherReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_PUBLISHER:
            return {
                ...state
            }
        case FETCH_PUBLISHER_SUCCESS:
            return {
                ...state,
                publishers: action.data
            }
        case FETCH_PUBLISHER_ERROR:
            return {
                ...state,
                publishers: null
            }
        default: return state;
    }
}

export default publisherReducer;