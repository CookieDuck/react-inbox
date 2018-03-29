export const FETCH_MESSAGES_STARTED = 'FETCH_MESSAGES_STARTED';
export const FETCH_MESSAGES_COMPLETED = 'FETCH_MESSAGES_COMPLETED';
export const TOGGLE_COMPOSE_MESSAGE = 'TOGGLE_COMPOSE_MESSAGE';
export const TOGGLE_SELECTED = 'TOGGLE_SELECTED';
export const TOGGLE_STARRED = 'TOGGLE_STARRED';
export const CREATE_NEW_MESSAGE = 'CREATE_NEW_MESSAGE';
export const SELECT_ALL = 'SELECT_ALL';
export const SELECT_NONE = 'SELECT_NONE';
export const MARK_AS_READ = 'MARK_AS_READ';
export const MARK_AS_UNREAD = 'MARK_AS_UNREAD';
export const DELETE = 'DELETE';
export const APPLY_LABEL = 'APPLY_LABEL';
export const REMOVE_LABEL = 'REMOVE_LABEL';

const getResource = async (resource) => {
    const response = await fetch(`/api/${resource}`);
    console.log(`Raw response for ${resource}:`, response);
    const json = await response.json();
    console.log(`JSON of ${resource}:`, json);
    return json._embedded[resource];
}

const getMessageById = async (id) => {
    const response = await fetch(`/api/messages/${id}`);
    console.log(`Raw response for id ${id}:`, response);
    const json = await response.json();
    console.log(`JSON of message by id ${id}:`, json);
    return json;
}

const patch = async (requestEnvelope) => {
    console.log("Doing patch for", requestEnvelope, JSON.stringify(requestEnvelope));
    return await fetch('/api/messages', {
        method: "PATCH",
        body: JSON.stringify(requestEnvelope),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
}

const postNewMessageToApi = async (newMessage) => {
    const response = await fetch('/api/messages', {
        method: "POST",
        body: JSON.stringify(newMessage),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    console.log("Raw response from post to /api/messages", response);
    const json = await response.json();
    console.log("Parsed JSON from post:", json);
    return json;
}

export const fetchMessages = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_MESSAGES_STARTED });
        var messages = await getResource("messages");
        dispatch({ type: FETCH_MESSAGES_COMPLETED, data: messages });
    }
}

export const toggleComposeForm = () => ({ type: TOGGLE_COMPOSE_MESSAGE })

export const toggleSelected = (messageId) => ({ type: TOGGLE_SELECTED, data: messageId })

export const toggleStarred = (id, starred) => {
    return async (dispatch) => {
        // TODO dispatch a temporary 'toggling star' action while we wait for response from patch and get!
        await patch({ 'messageIds': [id], 'command': 'star', 'star': starred });
        const getResponse = await getMessageById(id);
        dispatch({ type: TOGGLE_STARRED, id, starred: getResponse.starred });
    };
}

export const createNewMessage = (newMessage) => {
    return async (dispatch) => {
        // TODO dispatch a temporary 'posting message' actoin while we wait for response from server!
        const newMessageFromServer = await postNewMessageToApi(newMessage);
        dispatch({ type: CREATE_NEW_MESSAGE, message: newMessageFromServer });
    }
}

export const selectAll = () => ({ type: SELECT_ALL })

export const selectNone = () => ({ type: SELECT_NONE })

export const markAsRead = (ids) => {
    return async (dispatch) => {
        await patch({ 'messageIds': ids, 'command': 'read', 'read': true });
        //TODO on a get per each id in ids?
        dispatch({ type: MARK_AS_READ, ids });
    }
}

export const markAsUnread = (ids) => {
    return async (dispatch) => {
        await patch({ 'messageIds': ids, 'command': 'read', 'read': false });
        //TODO on a get per each id in ids?
        dispatch({ type: MARK_AS_UNREAD, ids });
    }
}

export const deleteMessages = (ids) => {
    return async (dispatch) => {
        await patch({ 'messageIds': ids, 'command': 'delete' });
        dispatch({ type: DELETE, ids });
    }
}

export const applyLabel = (ids, label) => {
    return async (dispatch) => {
        if (ids && ids.length > 0) {
            await patch({ 'messageIds': ids, 'command': 'addLabel', 'label': label });
            dispatch({ type: APPLY_LABEL, ids, label });
        }
    }
}

export const removeLabel = (ids, label) => {
    return async (dispatch) => {
        if (ids && ids.length > 0) {
            await patch({ 'messageIds': ids, 'command': 'removeLabel', 'label': label });
            dispatch({ type: REMOVE_LABEL, ids, label });
        }
    }
}