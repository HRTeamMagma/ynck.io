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
          { this.props.imageResults ? 
            this.props.imageResults.map((image, i) => {
              return ( 
                <div key={i}><img src={image.url}/></div> 
              );
            }) 
            : 
            this.props.imageResults === undefined ? null
            :
            <div>
              <h2><strong>{this.props.imageResults}</strong></h2>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default SearchResults;