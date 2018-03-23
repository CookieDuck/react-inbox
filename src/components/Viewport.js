import React from 'react';
import { bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';
import Messages from './Messages';
import Toolbar from './Toolbar';
import Compose from './Compose';
import { fetchMessages } from '../actions/ActionCreator';
import store from '../Store';

class Viewport extends React.Component {
    handleMessage = async (newMessage) => {
        const newMessageFromServer = await this.postNewMessage(newMessage);
        this.setState({ messages: [...this.state.messages, newMessageFromServer], showComposeForm: false });
    }

    postNewMessage = async (newMessage) => {
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
            case "toggleSelected":
                ({ message, messages: updatedMessages } = this.getItemAndUpdatedMessages(id));
                message.selected = !message.selected;
                break;

            case "toggleStarred":
                ({ message, messages: updatedMessages } = this.getItemAndUpdatedMessages(id));
                const nextStarredState = !message.starred;
                message.starred = nextStarredState;
                this.patch({'messageIds': [id], 'command': 'star', 'star': nextStarredState});
                break;

            case "selectAll":
                const isAllSelected = this.state.messages.every((m) => m.selected);
                updatedMessages = this.state.messages.map((m) => {
                    const copy = this.cloneMessage(m);
                    copy.selected = !isAllSelected;
                    return copy;
                });
                break;

            case "markAsRead": // fall-through on purpose
            case "markAsUnread":
                const newReadStatus = action === "markAsRead";
                updatedMessages = this.state.messages.map((m) => {
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
                updatedMessages = this.state.messages.reduce((accumulator, m) => {
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
                updatedMessages = this.state.messages.map((m) => {
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
                updatedMessages = this.state.messages.map((m) => {
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
            
            case "toggleCompose":
                this.setState({ showComposeForm: !this.state.showComposeForm });
                return;

            default:
                console.debug("Received unknown action:", action);
        }

        this.setState({ messages: updatedMessages });
    }

    indexOf = (id) => {
        return this.state.messages.findIndex(m => m.id === id);
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
        const message = this.cloneMessage(this.state.messages[indexOfMessage]);
        const msgs = [
            ...this.state.messages.slice(0, indexOfMessage),
            message,
            ...this.state.messages.slice(indexOfMessage + 1)
        ];
        return ({ message: message, messages: msgs });
    }

    render() {
        return (
            <div>
                <Provider store={store}>
                <Toolbar messages={this.props.messages} actionHandler={this.handleAction} />
                </Provider>
                { this.props.showComposeForm ? <Compose messageHandler={this.handleMessage} /> : ""}
                { this.props.isFetchingMessages ? 
                    <h1>Loading...</h1> : 
                    <Messages messages={this.props.messages} actionHandler={this.handleAction} /> 
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

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchMessages }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Viewport);