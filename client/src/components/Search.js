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
      <div>
      <div className="searchFilter">
        <select className="form-control" name="searchType" onChange={(e) => this.captureSearchInput(e)} >
          <option value="shops">Shops</option>
          <option value="users">Users</option>
          <option value="tags">Tags</option>
        </select>
      </div>
      <div className="search" >        
        <input className="searchbox" name="searchInput" placeholder="Search for shops, users, tags" onChange={(e) => this.captureSearchInput(e)}></input>
        <span className="search-icon" onClick={ () => this.props.submitSearch(this.state.searchInput, this.state.searchType) }></span>
      </div>    </div>
    );
  }
}

export default Search;