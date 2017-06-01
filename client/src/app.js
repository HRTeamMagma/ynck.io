import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import '../../public/stylesheets/main.scss'; // or `.scss` if you chose scss

import ReduxComp from './components/ReduxComp';

import { Route, Link, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';
// import { Router, Route, IndexRoute, browserHistory} from 'react-router';

const router = (
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={ReduxComp}>
      </Route>
    </BrowserRouter>
 </Provider>

);


ReactDOM.render(router, document.getElementById('root'));
