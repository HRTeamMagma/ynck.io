import React from 'react';


class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.clearSearch();
  }

  render() {
    return (
      <div className="searchResults">
        <div className="feed_container">
          { this.props.searchResults.imageResults ? 
            this.props.searchResults.imageResults.map((image, i) => {
              return ( 
                <div key={i}><img src={image.url}/></div> 
              );
            }) 
            : 
            this.props.searchResults === undefined ? null
            :
            <div>
              <h2><strong>{this.props.searchResults}</strong></h2>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default SearchResults;