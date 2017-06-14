import React from 'react';
import ReactDOM from 'react-dom';


class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchInput: '',
      searchType: ''
    };
    this.captureSearchInput = this.captureSearchInput.bind(this);
  }

  captureSearchInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  render() {
    return (
      <div className="search" > 
        <select className="searchFilter" name="searchType" onChange={(e) => this.captureSearchInput(e)} >
          <option value="tags">Tags</option>
          <option value="shops">Shops</option>
          <option value="users">Users</option>
        </select>       
        <input className="searchbox" name="searchInput" placeholder="Search for tags, shops, or users" onChange={(e) => this.captureSearchInput(e)}></input>
        <span className="search-icon" onClick={ () => this.props.submitSearch(this.state.searchInput, this.state.searchType) }></span>
      </div>
    );
  }
}

export default Search;