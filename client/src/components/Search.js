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
    console.log('searchinput', this.state.searchInput);

    this.setState({
      searchInput: e.target.value
    });
  }

  submitSearch() {
    console.log('submit search called');
    // GET request to db to fetch list of shops, users, tags
    // axios.get('/search')
    // .then((response) => {
    //   console.log('response', response);
    // })
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