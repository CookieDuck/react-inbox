import React, { Component } from 'react';
import Viewport from '../src/components/Viewport';
import store from './Store';
import { fetchMessages } from './actions/ActionCreator';

class App extends Component {
    componentDidMount() {
        store.dispatch(fetchMessages());
    }

    render() {
        return(<Viewport />);
    }
}

export default App;