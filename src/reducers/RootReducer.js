import {
    FETCH_MESSAGES_STARTED,
    FETCH_MESSAGES_COMPLETED,
    TOGGLE_COMPOSE_MESSAGE,
    TOGGLE_SELECTED,
    TOGGLE_STARRED,
    CREATE_NEW_MESSAGE,
    SELECT_ALL,
    SELECT_NONE,
    MARK_AS_READ
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

const cloneMessagesWithSelectedState = function(messages, selected) {
    return messages.map((m) => {
        const copy = cloneMessage(m);
        copy.selected = selected;
        return copy;
    });
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

        case CREATE_NEW_MESSAGE:
            return {...state, messages: state.messages.concat(action.message), showComposeForm: false };

        case TOGGLE_SELECTED:
            ({ message, messages: updatedMessages } = getItemAndUpdatedMessages(action.data, state.messages));
            message.selected = !message.selected;
            return {...state, messages: updatedMessages };
        
        case TOGGLE_STARRED:
            ({ message, messages: updatedMessages } = getItemAndUpdatedMessages(action.id, state.messages));
            message.starred = action.starred;
            return {...state, messages: updatedMessages };

        case SELECT_ALL:
            return {...state, messages: cloneMessagesWithSelectedState(state.messages, true)};

        case SELECT_NONE:
            return {...state, messages: cloneMessagesWithSelectedState(state.messages, false)};

        case MARK_AS_READ:
            // TODO make this not terrible
            updatedMessages = state.messages.map((m) => cloneMessage(m));
            action.ids.forEach(id => {
                const indexOfMessage = indexOf(id, updatedMessages);
                updatedMessages[indexOfMessage].read = true;
            });
            return {...state, messages: updatedMessages};

        default:
        return state;
    }
}