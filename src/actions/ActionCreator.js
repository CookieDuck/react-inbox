export const FETCH_MESSAGES_STARTED = 'FETCH_MESSAGES_STARTED';
export const FETCH_MESSAGES_COMPLETED = 'FETCH_MESSAGES_COMPLETED';
export const TOGGLE_COMPOSE_MESSAGE = 'TOGGLE_COMPOSE_MESSAGE';
export const TOGGLE_SELECTED = 'TOGGLE_SELECTED';
export const TOGGLE_STARRED = 'TOGGLE_STARRED';

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
