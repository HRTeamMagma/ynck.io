import React from 'react';
import { connect } from 'react-redux';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';
import { fetchAllUserData } from './../../actions/actionUserInfo';




import Header from './Header';
import Footer from './Footer';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Shop from './Shops/Shop';
import Template from './Template';


class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.getUserData = this.getUserData.bind(this);
    console.log('propssssssssssss ', this.props);
  }

  componentWillReceiveProps() {
    
    this.getUserData();
  }

  getUserData () {
    this.props.fetchAllUserData('/api/profiles/user-data', this.props.match.params.id);
  }
  render() {
    return (
      <div>
        {/*{ this.props.children }*/}
      
        <BrowserRouter>
          <Switch>
            <Template>
              <Route exact path="/" render={(props) => (<Home loggedInUser={loggedInUser} {...props} />)} />
              <Route path = "/user/:id" render={(props) => (<Profile {...props} />)} />
              <Route path = "/shop" component={Shop} />
            </Template>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.userData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUserData: (url, id) => dispatch(fetchAllUserData(url, id))
  };
};

connect(mapStateToProps, mapDispatchToProps)(Layout);

export default Layout;
