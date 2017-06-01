import { createStore, compose } from 'redux';
import { render, syncHistoryWithStore } from 'react-router-redux';


import rootReducer from './client/reducers/index';

const defaultState = {
  comments: {'Devon': [{
    'text': 'hate it all',
    'user': 'shit head'
  }]},
  posts: 
  [
    {
      'code': 'BAcyDyQwcXX',
      'caption': 'Drugs #russia',
      'likes': 56,
      'id': '1161022966406956503',
      'display_src': 'https://s-media-cache-ak0.pinimg.com/originals/a2/e0/ec/a2e0ec9577f5946f3ab50d1730211475.jpg'
    }
  ]
};

const store = createStore(rootReducer, defaultState, window.devToolsExtension ? window.devToolsExtension() : f => f);


export default store;