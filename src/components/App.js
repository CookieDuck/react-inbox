import React from 'react';
import Messages from './Messages';
import Toolbar from './Toolbar';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: props.messages };
    }

    handleAction = ({action, id}) => {
        var message, updatedMessages;
        console.log("Received action", action);

        switch (action) {
            case "toggleSelected":
                ({ message: message, messages: updatedMessages } = this.getItemAndUpdatedMessages(id));
                message.selected = !message.selected;
                break;

            case "toggleStarred":
                ({ message: message, messages: updatedMessages } = this.getItemAndUpdatedMessages(id));
                message.starred = !message.starred;
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
                    }
                    return copy;
                });
                break;

            case "deleteSelected":
                updatedMessages = this.state.messages.reduce((accumulator, m) => {
                    if (!m.selected) {
                        accumulator.push(this.cloneMessage(m));
                    }
                    return accumulator;
                }, []);
                break;
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

export default App;