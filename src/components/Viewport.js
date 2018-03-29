import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Messages from './Messages';
import Toolbar from './Toolbar';
import Compose from './Compose';
import { 
    fetchMessages, 
    toggleComposeForm, 
    createNewMessage, 
    selectAll, 
    selectNone, 
    markAsRead, 
    markAsUnread, 
    deleteMessages, 
    applyLabel,
    removeLabel 
 } from '../actions/ActionCreator';
import store from '../Store';

class Viewport extends React.Component {

    componentWillMount() {
        store.dispatch(fetchMessages());
    }

    getSelectedMessageIds = () => {
        return !this.props.messages ? [] : this.props.messages.filter((m) => m.selected).map((m) => m.id);
    }

    render() {
        return (
            <div>
                <Toolbar 
                    messages={this.props.messages} 
                    toggleCompose={() => store.dispatch(toggleComposeForm()) }
                    selectAll={() => store.dispatch(selectAll()) }
                    selectNone={() => store.dispatch(selectNone()) } 
                    markAsRead={() => store.dispatch(markAsRead(this.getSelectedMessageIds()))} 
                    markAsUnread={() => store.dispatch(markAsUnread(this.getSelectedMessageIds()))} 
                    deleteMessages={() => store.dispatch(deleteMessages(this.getSelectedMessageIds()))} 
                    applyLabel={(label) => store.dispatch(applyLabel(this.getSelectedMessageIds(), label))} 
                    removeLabel={(label) => store.dispatch(removeLabel(this.getSelectedMessageIds(), label))} />
                { this.props.showComposeForm ? 
                    <Compose onComposeFinished={ (newMessage) => store.dispatch(createNewMessage(newMessage)) } /> : ""}
                { this.props.isFetchingMessages ? 
                    <h1>Loading...</h1> : 
                    <Messages messages={this.props.messages} /> 
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    messages: state.messages,
    isFetchingMessages: state.isFetchingMessages,
    showComposeForm: state.showComposeForm
})

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchMessages, toggleComposeForm }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Viewport);