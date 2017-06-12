import React from 'react';
import ReactDOM from 'react-dom';

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="search" >
        <input className="searchbox" placeholder="Search for shops, users, tags"></input>
      </div>
    );
  }
}

export default Search;