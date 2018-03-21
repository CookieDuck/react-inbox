import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/RootReducer';
import logger from 'redux-logger';

const initialState = { messages: [], isFetchingMessages: false, showComposeForm: false };

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer, 
    initialState,
    composeEnhancers(applyMiddleware(thunk, logger))
);

export default store;