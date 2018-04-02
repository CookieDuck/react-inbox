import React from 'react';
import { connect } from 'react-redux';
import Messages from './Messages';
import Toolbar from './Toolbar';
import Compose from './Compose';

const Viewport = ({messages, showComposeForm, isFetchingMessages}) => {
    return (
        <div>
            <Toolbar />
            {showComposeForm ? <Compose /> : ""}
            {isFetchingMessages ? <h1>Loading...</h1> : <Messages />}
        </div>
    );
}

const mapStateToProps = (state) => ({
    messages: state.messages, 
    showComposeForm: state.showComposeForm,
    isFetchingMessages: state.isFetchingMessages
})

export default connect(mapStateToProps, null)(Viewport);