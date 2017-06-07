import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { render, syncHistoryWithStore } from 'react-router-redux';

import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/index';

const middleware = [ thunk ];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}


const store = createStore(
  rootReducer, 
  // To enable Chrome redux debugger. Must come before applyMiddleware
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), 
  applyMiddleware(...middleware)
);

export default store;