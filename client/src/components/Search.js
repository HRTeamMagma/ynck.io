import React from 'react';
import ReactDOM from 'react-dom';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: ''
    };
    this.captureSearchInput = this.captureSearchInput.bind(this);
  }

  captureSearchInput(e) {
    this.setState({
      searchInput: e.target.value
    });
  }

  render() {
    return (
      <div className="search" >
        <input className="searchbox" placeholder="Search for shops, users, tags" onChange={(e) => this.captureSearchInput(e)}></input>
        <span className="search-icon" onClick={ () => this.props.submitSearch(this.state.searchInput) }></span>
      </div>
    );
  }
}

export default Search;