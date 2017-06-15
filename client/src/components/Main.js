import React from 'react';
import { Route, Link, BrowserRouter, Switch, Redirect, withRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import { connect } from 'react-redux';
import { search } from './../../actions/actionSearch';
import { getAllShops } from './../../actions/actionShopInfo';

import Template from './Template';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import Shop from './Shops/Shop';
import SearchResults from './SearchResults';
import ClaimShop from './Shops/ClaimShop';
import AllShops from './Shops/AllShops';
import Stats from './Stats';


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
    this.fetchAllShops = this.fetchAllShops.bind(this);

  }

  componentDidMount() {
    this.fetchAllShops('/api/allShops');
  }

  submitSearch(e, searchTerm, searchType) {
    e.preventDefault();
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

  fetchAllShops (url) {
    this.props.getAllShops(url);
  }

  render() {
    return (
      <div>      
        <BrowserRouter>
          <Switch>
            <Template submitSearch={this.submitSearch} >  
              <Route exact path="/" render={(props) => this.state.searchSubmitted ? (<Redirect to="/search"/>) : (<Home loggedInUser={loggedInUser} {...props} />)} />
              <Route path = "/user/:id" render={(props) => this.state.searchSubmitted ? (<Redirect to="/search"/>) : (<Profile {...props} />)} />
              <Route path = "/shop/:id" render={(props) => this.state.searchSubmitted ? (<Redirect to="/search"/>) : (<Shop {...props} />)} />
              <Route path = "/claimshop" render={(props) => this.state.searchSubmitted ? (<Redirect to="/search"/>) : (<ClaimShop {...props} />)} />
              <Route path = "/stats" render={(props) => this.state.searchSubmitted ? (<Redirect to="/search"/>) : (<Stats {...props} />)} />
              <Route path = "/search" render={(props) => (<SearchResults searchType={this.state.searchType} searchTerm={this.state.searchTerm} searchIsLoading={this.props.searchIsLoading} searchResults={this.props.searchResults} clearSearch={this.clearSearch} {...props} />)} />
              <Route path = "/allShops" render={(props) => this.state.searchSubmitted ? (<Redirect to="/search"/>) : (<AllShops loggedInUser={loggedInUser} {...this.props} />)} />
            </Template>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    searchIsLoading: state.searchIsLoading,
    searchResults: state.searchResults,
    allShops: state.allShops
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    search: (url, searchTerm, searchType, callback) => dispatch(search(url, searchTerm, searchType, callback)),
    getAllShops: (url) => dispatch(getAllShops(url))
  };
};

const history = createHistory();

export default connect(mapStateToProps, mapDispatchToProps)(Main);
