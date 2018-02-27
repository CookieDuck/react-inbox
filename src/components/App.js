import React from 'react';
import Messages from './Messages';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: props.messages };
    }

    handleAction = (action) => {
        console.log("Received action", action);
        switch (action.action) {
            case "toggleSelected":
                const index = this.indexOf(action.id);
                const toggledMessage = this.cloneMessage(this.state.messages[index]);
                toggledMessage.selected = !toggledMessage.selected;

                const updatedMessages = [
                    ...this.state.messages.slice(0, index),
                    toggledMessage,
                    ...this.state.messages.slice(index + 1)
                ];
                this.setState({ messages: updatedMessages })
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

    render() {
        return(
            <div>
                <Messages messages={this.state.messages} actionHandler={this.handleAction} />
            </div>
        );
    }
}

export default App;