export const FETCH_MESSAGES_STARTED = 'FETCH_MESSAGES_STARTED';
export const FETCH_MESSAGES_COMPLETED = 'FETCH_MESSAGES_COMPLETED';
export const TOGGLE_COMPOSE_MESSAGE = 'TOGGLE_COMPOSE_MESSAGE';

const getResource = async (resource) => {
    const response = await fetch(`/api/${resource}`);
    console.log("Raw response for", resource, ":", response);
    const json = await response.json();
    console.log("JSON of", resource, ":", json);
    return json._embedded[resource];
}

export const fetchMessages = () => {
    return async (dispatch) => {
        dispatch({ type: FETCH_MESSAGES_STARTED });
        var messages = await getResource("messages");
        dispatch({ type: FETCH_MESSAGES_COMPLETED, data: messages });
    }
}

export const toggleComposeForm = () => ({ type: TOGGLE_COMPOSE_MESSAGE })
