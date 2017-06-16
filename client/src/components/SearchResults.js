import React from 'react';
import { CometSpinLoader } from 'react-css-loaders';


class SearchResults extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.clearSearch();
  }

  render() {
    if (this.props.searchType === 'tags') {
      var tagResults = this.props.searchResults.imageResults;
    } else if (this.props.searchType === 'shops') {
      var shopResults = this.props.searchResults.shops;
    } else {
      var userResults = this.props.searchResults.users;
    }

    return (
        <div className="feed_container">
          { this.props.searchIsLoading ? <CometSpinLoader size={40} color={'#8f4b5a'}/> : (
            <div className="searchResults">
              {
                this.props.searchResults.msg ? 
                <h3>{ this.props.searchResults.msg } </h3> :
                <h2>Search results for “{this.props.searchTerm}”</h2>
              }
              <div className="image_grid">
                { tagResults ? tagResults.map((image, i) => 
                <div key={i} className="solo_image">
                    <img src={image.url} className="base_pic"/>
                  </div>) : null
                }

                { shopResults ? shopResults.map((shop, i) => 
                  <div key={i} className="solo_image">
                    <a href={`/shop/${shop.id}`} >
                      <h4>{shop.name}</h4>
                      <img src={shop.shop_image} className="base_pic"/>
                    </a>
                  </div>) : null
                }
                {
                  userResults ? userResults.map((user, i) => 
                  <div key={i} className="solo_user_image">
                    <a href={`/user/${user.id}`} >
                      <h4>{user.first} {user.last}</h4>
                      <img src={user.profile_image} className="user_profile_image"/>
                    </a>
                  </div>) : null
                }
            </div>          
          </div>
        )}
      </div>
    );
  }
}

export default SearchResults;