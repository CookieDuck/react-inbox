import React from 'react';
import Message from './Message';
import { connect } from 'react-redux';

const Messages = ({messages}) => {
    return (
        <div>
            {messages.map((m) => <Message key={m.id} message={m} />)}
        </div>
    );
}

const mapStateToProps = (state) => ({ messages: state.messages });

export default connect(mapStateToProps, null)(Messages);