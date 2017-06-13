import React from 'react';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { search } from './../../actions/actionSearch';

import Template from './Template';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Shop from './Shops/Shop';
import SearchResults from './SearchResults';
import ClaimShop from './Shops/ClaimShop';


class Main extends React.Component {
  constructor(props) {
    super(props);

    this.submitSearch = this.submitSearch.bind(this);
  }

  submitSearch(searchInput) {
    console.log('searchInput ', searchInput);
    this.props.search('/api/search', searchInput);
  }
 

  render() {
    return (
      <div>      
        <BrowserRouter>
          <Switch>
            <Template submitSearch={this.submitSearch} >  
              <Route exact path="/" render={(props) => (<Home loggedInUser={loggedInUser} {...props} />)} />
              <Route path = "/user/:id" component={Profile} />
              <Route path = "/shop" component={Shop} />
              <Route path = "/search" render={(props) => (<SearchResults imageResults={this.props.searchResults} {...props} />)} />
              <Route path = "/claimshop" component={ClaimShop} />
            </Template>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    searchResults: state.searchResults
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    search: (url, searchInput) => dispatch(search(url, searchInput))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Main);
