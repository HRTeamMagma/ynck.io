import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';

import { Route, Link, BrowserRouter } from 'react-router-dom';// import { Router, Route, IndexRoute, browserHistory} from 'react-router';

const router = (
    <BrowserRouter>
      <Route path="/" component={Main}>
      

      </Route>
    </BrowserRouter>

);


ReactDOM.render(router, document.getElementById('root'));
