import React from 'react';
import Viewport from '../src/components/Viewport';
import store from './Store';
import { fetchMessages } from './actions/ActionCreator';

const App = () => { return(<Viewport />); }
store.dispatch(fetchMessages());

export default App;