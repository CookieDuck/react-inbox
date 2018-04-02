import React from 'react';
import Viewport from '../src/components/Viewport';
import store from './Store';
import { fetchMessages } from './actions/ActionCreator';

store.dispatch(fetchMessages());

const App = () => { return(<Viewport />); }

export default App;