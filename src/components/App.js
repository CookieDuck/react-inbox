import React from 'react';
import Messages from './Messages';
import Toolbar from './Toolbar';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: props.messages };
    }

    handleAction = (action) => {
        var message, updatedMessages;
        console.log("Received action", action);

        switch (action.action) {
            case "toggleSelected":
                ({ message: message, messages: updatedMessages } = this.getItemAndUpdatedMessages(action.id));
                message.selected = !message.selected;
                this.setState({ messages: updatedMessages })
                break;

            case "toggleStarred":
                ({ message: message, messages: updatedMessages } = this.getItemAndUpdatedMessages(action.id));
                message.starred = !message.starred;
                this.setState({ messages: updatedMessages })
                break;

            case "selectAll":
                const allSelected = this.state.messages.every((m) => m.selected);
                updatedMessages = this.state.messages.map((m) => {
                    const copy = this.cloneMessage(m);
                    copy.selected = !allSelected;
                    return copy;
                });
                this.setState({ messages: updatedMessages });

                break;
        }
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