import React from 'react';
import Message from './Message';

const Messages = ({messages}) => {
    return (
        <div>
            {messages.map(m => <Message message={m}/>)}
        </div>
    );
}

export default Messages;