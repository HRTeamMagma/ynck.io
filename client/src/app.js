import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import '../../public/stylesheets/main.scss'; 

import store from './store';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Shop from './components/Shops/Shop';



const router = (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path = "/" component={Home} />
        <Route path = "/user/:id" component={Profile} />
        <Route path = "/shop" component={Shop} />
      </Switch>
    </BrowserRouter>
 </Provider>
);


ReactDOM.render(router, document.getElementById('root'));
