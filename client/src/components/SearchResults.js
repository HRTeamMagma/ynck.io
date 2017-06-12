import React from 'react';


class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="searchResults">
        <div className="feed_container">
          { console.log('search results', this.props.searchResults)}
        </div>
      </div>
    );
  }
}

export default SearchResults;