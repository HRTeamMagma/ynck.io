import React from 'react';
import ReactDOM from 'react-dom';


class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      searchType: 'tags'
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
        <form onSubmit={ (e) => this.props.submitSearch(e, this.state.searchTerm, this.state.searchType) } >
          <select className="searchFilter" name="searchType" onChange={(e) => this.captureSearchInput(e)} >
            <option value="tags">Tags</option>
            <option value="shops">Shops</option>
            <option value="users">Users</option>
          </select>       
          <input className="searchbox" name="searchTerm" placeholder="Search for tags, shops, or users" onChange={(e) => this.captureSearchInput(e)}></input>
          <span className="search-icon" onClick={ (e) => this.props.submitSearch(e, this.state.searchTerm, this.state.searchType) }></span>
        </form>
      </div>
    );
  }
}

export default Search;