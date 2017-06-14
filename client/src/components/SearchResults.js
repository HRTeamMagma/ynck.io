import React from 'react';


class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.clearSearch();
  }

  render() {

    if (this.props.searchType === "tags") {
      var tagResults = this.props.searchResults.imageResults;
    } else if (this.props.searchType === "shops") {
      var shopResults = this.props.searchResults.shops;
    } else {
      var userResults = this.props.searchResults.users;
    }

    return (
      <div className="searchResults">
        <div className="feed_container">

          { tagResults ? tagResults.map((image, i) => 
            <div key={i}><img src={image.url}/></div>) : null
          }

          { shopResults ? shopResults.map((shop, i) => 
            <div key={i}><h4>{shop.name}</h4>
              <img src={shop.shop_image}/>
            </div>) : null
          }

          {
            userResults ? userResults.map((user, i) => 
            <div key={i}><h4>{user.first} {user.last}</h4>
              <img src={user.profile_image}/>
            </div>) : null
          }
          {
            this.props.searchResults.msg ? 
            <h3>{ this.props.searchResults.msg } </h3>
            : null
          }
        </div>
      </div>
    );
  }
}

export default SearchResults;