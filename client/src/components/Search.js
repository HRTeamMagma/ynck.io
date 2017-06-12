import React from 'react';
import ReactDOM from 'react-dom';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: ''
    };
    this.captureSearchInput = this.captureSearchInput.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  captureSearchInput(e) {
    this.setState({
      searchInput: e.target.value
    });
  }

  submitSearch(searchResults) {
    this.props.search('/search', searchResults);
  }

  render() {
    return (
      <div className="search" >
        <input className="searchbox" placeholder="Search for shops, users, tags" onChange={(e) => this.captureSearchInput(e)}></input>
        <span className="search-icon" onClick={ () => this.submitSearch(this.state.searchInput) }></span>
      </div>
    );
  }
}

export default Search;