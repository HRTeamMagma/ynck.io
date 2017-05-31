import { createStore, compose } from 'redux';
import { render, syncHistoryWithStore } from 'react-router-redux';


import rootReducer from './client/reducers/index';

const defaultState = {
    
};

const store = createStore(rootReducer, defaultState);


export default store;