import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import logger from 'redux-logger'
import rootReducer from './reducers/rootReducer'
const store = createStore(rootReducer, applyMiddleware(thunk, logger))

// const store = createStore(
//   reducer,
//   applyMiddleware(logger)
// )

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();
