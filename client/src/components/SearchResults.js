import React from 'react';


class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="searchResults">
        <div className="feed_container">
          { this.props.imageResults ? 
            this.props.imageResults.map((image, i) => {
              return ( 
                <div key={i}><img src={image.url}/></div> 
              );
            }) : null
          }
        </div>
      </div>
    );
  }
}

export default SearchResults;