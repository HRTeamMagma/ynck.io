import React from 'react';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';

import Template from './Template';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Shop from './Shops/Shop';
import SearchResults from './SearchResults';
import ClaimShop from './Shops/ClaimShop';


class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>      
        <BrowserRouter>
          <Switch>
            <Template>
              <Route exact path="/" render={(props) => (<Home loggedInUser={loggedInUser} {...props} />)} />
              <Route path = "/user/:id" component={Profile} />
              <Route path = "/shop" component={Shop} />
              <Route path = "/search" component={SearchResults} />
              <Route path = "/claimshop" component={ClaimShop} />
            </Template>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}


export default Main;
