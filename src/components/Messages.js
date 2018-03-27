import React from 'react';
import Message from './Message';
import store from '../Store';
import { toggleSelected, toggleStarred } from '../actions/ActionCreator';

const Messages = ({messages, actionHandler}) => {
    return (
        <div>
            {messages.map(m => 
            <Message 
                key={m.id} 
                message={m}
                toggleSelected={ (messageId) => store.dispatch(toggleSelected(messageId)) }
                toggleStarred={ (id) => store.dispatch(toggleStarred(id, !m.starred)) }
                actionHandler={actionHandler} 
            />)}
        </div>
    );
}

export default Messages;