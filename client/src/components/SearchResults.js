import React from 'react';


class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="searchResults">
      {console.log('props: ', this.props)}
        <div className="feed_container">
          { this.props.imageResults.imageResults ? 
            this.props.imageResults.imageResults.map((image, i) => {
              return ( 
                <div key={i}><img src={image.url}/></div> 
              );
            }) 
            : 
            this.props.imageResults === undefined ?
            null
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