import React from 'react';
import Message from './Message';

const Messages = ({messages, actionHandler}) => {
    return (
        <div>
            {messages.map(m => <Message key={m.id} message={m} actionHandler={actionHandler} />)}
        </div>
    );
}

export default Messages;