import React from 'react';
import Messages from './Messages';
import Toolbar from './Toolbar';

class Viewport extends React.Component {
    constructor(props) {
        super(props);
        this.state =  { messages: [] }
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

    async getResource(resource) {
        const response = await fetch(`/api/${resource}`);
        console.log("Raw response for", resource, ":", response);
        const json = await response.json();
        console.log("JSON of", resource, ":", json);
        return json._embedded[resource];
    }

    async componentDidMount() {
        const messages = await this.getResource("messages");
        this.setState({ messages: messages });
    }

    handleAction = ({action, id, label}) => {
        var message, updatedMessages;
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
                const markingMessageIds = [];
                updatedMessages = this.state.messages.map((m) => {
                    const copy = this.cloneMessage(m);
                    if (copy.selected) {
                        copy.read = newReadStatus;
                        markingMessageIds.push(copy.id);
                    }
                    return copy;
                });

                this.patch({
                    'messageIds': markingMessageIds,
                    'command': 'read',
                    'read': newReadStatus
                });

                break;

            case "deleteSelected":
                const messageIdsToDelete = [];
                updatedMessages = this.state.messages.reduce((accumulator, m) => {
                    if (!m.selected) {
                        accumulator.push(this.cloneMessage(m));
                    } else {
                        messageIdsToDelete.push(m.id);
                    }
                    return accumulator;
                }, []);

                this.patch({
                    'messageIds': messageIdsToDelete,
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
                        }
                    }
                    return copy;
                });
                break;

            case "removeLabel":
                updatedMessages = this.state.messages.map((m) => {
                    const copy = this.cloneMessage(m);
                    if (copy.selected && copy.labels) {
                        const indexOfLabel = copy.labels.findIndex(l => l === label);
                        if (indexOfLabel > -1) {
                            copy.labels.splice(indexOfLabel, 1);
                        }
                    }
                    return copy;
                });
                break;

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
                <Toolbar messages={this.state.messages} actionHandler={this.handleAction} />
                <Messages messages={this.state.messages} actionHandler={this.handleAction} />
            </div>
        );
    }
}

export default Viewport;