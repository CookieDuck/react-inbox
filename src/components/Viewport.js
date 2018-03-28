import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Messages from './Messages';
import Toolbar from './Toolbar';
import Compose from './Compose';
import { fetchMessages, toggleComposeForm, createNewMessage, selectAll, selectNone } from '../actions/ActionCreator';
import store from '../Store';

class Viewport extends React.Component {

    patch(requestEnvelope) {
        console.log("Doing patch for", requestEnvelope);
        fetch('/api/messages', {
            method: "PATCH",
            body: JSON.stringify(requestEnvelope),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    componentWillMount() {
        store.dispatch(fetchMessages());
    }

    handleAction = ({action, id, label}) => {
        var message, updatedMessages;
        var patchMessageIds = [];
        console.log("Received action", action);

        switch (action) {

            case "markAsRead": // fall-through on purpose
            case "markAsUnread":
                const newReadStatus = action === "markAsRead";
                updatedMessages = this.props.messages.map((m) => {
                    const copy = this.cloneMessage(m);
                    if (copy.selected) {
                        copy.read = newReadStatus;
                        patchMessageIds.push(copy.id);
                    }
                    return copy;
                });

                this.patch({
                    'messageIds': patchMessageIds,
                    'command': 'read',
                    'read': newReadStatus
                });

                break;

            case "deleteSelected":
                updatedMessages = this.props.messages.reduce((accumulator, m) => {
                    if (!m.selected) {
                        accumulator.push(this.cloneMessage(m));
                    } else {
                        patchMessageIds.push(m.id);
                    }
                    return accumulator;
                }, []);

                this.patch({
                    'messageIds': patchMessageIds,
                    'command': 'delete'
                });
                break;

            case "applyLabel":
                updatedMessages = this.props.messages.map((m) => {
                    const copy = this.cloneMessage(m);
                    if (copy.selected) {
                        if (!copy.labels) {
                            copy.labels = [label];
                        } else if (!copy.labels.includes(label)) {
                            copy.labels.push(label);
                            patchMessageIds.push(m.id);
                        }
                    }
                    return copy;
                });

                if (patchMessageIds.length > 0) {
                    this.patch({
                        'messageIds': patchMessageIds,
                        'command': 'addLabel',
                        'label': label
                    });
                }
                break;

            case "removeLabel":
                updatedMessages = this.props.messages.map((m) => {
                    const copy = this.cloneMessage(m);
                    if (copy.selected && copy.labels) {
                        const indexOfLabel = copy.labels.findIndex(l => l === label);
                        if (indexOfLabel > -1) {
                            copy.labels.splice(indexOfLabel, 1);
                            patchMessageIds.push(m.id);
                        }
                    }
                    return copy;
                });

                if (patchMessageIds.length > 0) {
                    this.patch({
                        'messageIds': patchMessageIds,
                        'command': 'removeLabel',
                        'label': label
                    });
                }
                break;
            
            default:
                console.debug("Received unknown action:", action);
        }

        this.setState({ messages: updatedMessages });
    }

    indexOf = (id) => {
        return this.props.messages.findIndex(m => m.id === id);
    }

    cloneMessage = (m) => {
        const newMsg = Object.assign({}, m);
        if (m.labels) {
            newMsg.labels = [...m.labels];
        }
        return newMsg;
    }

    getItemAndUpdatedMessages = (id) => {
        const indexOfMessage = this.indexOf(id);
        const message = this.cloneMessage(this.props.messages[indexOfMessage]);
        const msgs = [
            ...this.props.messages.slice(0, indexOfMessage),
            message,
            ...this.props.messages.slice(indexOfMessage + 1)
        ];
        return ({ message: message, messages: msgs });
    }

    render() {
        return (
            <div>
                <Toolbar 
                    messages={this.props.messages} 
                    actionHandler={this.handleAction} 
                    toggleCompose={() => store.dispatch(toggleComposeForm()) }
                    selectAll={() => store.dispatch(selectAll()) }
                    selectNone={() => store.dispatch(selectNone()) } />
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