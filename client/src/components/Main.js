import React from 'react';
import { Route, Link, BrowserRouter, Switch, Redirect, withRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

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
    this.state = {
      searchSubmitted: false,
      searchTerm: '',
      searchType: ''
    };
    this.submitSearch = this.submitSearch.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  submitSearch(searchTerm, searchType) {
    this.props.search('/api/search', searchTerm, searchType, () => {
      this.setState({
        searchSubmitted: true,
        searchTerm: searchTerm,
        searchType: searchType
      });
      history.push(`/search?q=${searchTerm}`);
    });
  }

  clearSearch() {
    this.setState({
      searchSubmitted: false
    });
  }

  render() {
    return (
      <div>      
        <BrowserRouter>
          <Switch>
            <Template submitSearch={this.submitSearch} >  
              <Route exact path="/" render={(props) => this.state.searchSubmitted ? (<Redirect to="/search"/>) : (<Home loggedInUser={loggedInUser} {...props} />)} />
              <Route path = "/user/:id" render={(props) => this.state.searchSubmitted ? (<Redirect to="/search"/>) : (<Profile {...props} />)} />
              <Route path = "/shop" render={(props) => this.state.searchSubmitted ? (<Redirect to="/search"/>) : (<Shop {...props} />)} />
              <Route path = "/claimshop" render={(props) => this.state.searchSubmitted ? (<Redirect to="/search"/>) : (<ClaimShop {...props} />)} />
              <Route path = "/search" render={(props) => (<SearchResults searchType={this.state.searchType} searchTerm={this.state.searchTerm}  searchResults={this.props.searchResults} clearSearch={this.clearSearch} {...props} />)} />
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
    search: (url, searchTerm, searchType, callback) => dispatch(search(url, searchTerm, searchType, callback))
  };
};

const history = createHistory();

export default connect(mapStateToProps, mapDispatchToProps)(Main);
