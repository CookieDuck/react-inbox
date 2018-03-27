import {
    FETCH_MESSAGES_STARTED,
    FETCH_MESSAGES_COMPLETED,
    TOGGLE_COMPOSE_MESSAGE,
    TOGGLE_SELECTED
} from '../actions/ActionCreator';

const indexOf = function(id, messages) {
    return messages.findIndex(m => m.id === id);
}

const cloneMessage = function(m) {
    const newMsg = Object.assign({}, m);
    if (m.labels) {
        newMsg.labels = [...m.labels];
    }
    return newMsg;
}

const getItemAndUpdatedMessages = function(id, messages) {
    const indexOfMessage = indexOf(id, messages);
    const message = cloneMessage(messages[indexOfMessage]);
    const msgs = [
        ...messages.slice(0, indexOfMessage),
        message,
        ...messages.slice(indexOfMessage + 1)
    ];
    return ({ message: message, messages: msgs });
}  

const initialState = {
    messages: null, 
    showComposeForm: false,
    isFetchingMessages: false
}  

export default (state = initialState, action) => {
    var message, updatedMessages;
    switch (action.type) {   
        case FETCH_MESSAGES_STARTED:
            return {...state, isFetchingMessages: true};

        case FETCH_MESSAGES_COMPLETED:
    return  {...state, messages: action.data, isFetchingMessages: false};

        case TOGGLE_COMPOSE_MESSAGE:
            return {...state, showComposeForm: !state.showComposeForm};

        case TOGGLE_SELECTED:
            ({ message, messages: updatedMessages } = getItemAndUpdatedMessages(action.data, state.messages));
            message.selected = !message.selected;
            return {messages: updatedMessages};

        default:
        return state;
    }
}