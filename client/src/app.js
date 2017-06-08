import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import '../../public/stylesheets/main.scss'; 

import store from './store';
import Layout from './components/Layout';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Shop from './components/Shops/Shop';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Layout>
              <Route exact path="/" render={(props) => (<Home loggedInUser={loggedInUser} {...props} />)} />
              <Route path = "/user/:id" component={Profile} />
              <Route path = "/shop" component={Shop} />
            </Layout>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
