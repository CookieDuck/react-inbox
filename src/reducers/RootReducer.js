import { 
    FETCH_MESSAGES_STARTED, 
    FETCH_MESSAGES_COMPLETED, 
    TOGGLE_COMPOSE_MESSAGE } from '../actions/ActionCreator';

const initialState = {
    messages: null,
    showComposeForm: false,
    isFetchingMessages: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MESSAGES_STARTED:
            return {...state, isFetchingMessages: true};

        case FETCH_MESSAGES_COMPLETED:
            return {...state, messages: action.data, isFetchingMessages: false};

        case TOGGLE_COMPOSE_MESSAGE:
            return {...state, showComposeForm: !state.showComposeForm};

        default:
        return state;
    }
}