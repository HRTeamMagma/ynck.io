import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { recentImagesFetchData, addToFavorites } from '../../actions/actionRecentImages';
import { getUserFavorites } from '../../actions/actionFavorites';
import { CometSpinLoader } from 'react-css-loaders';


class Favorite extends React.Component {
  constructor(props) {
    super(props);

    this.addAFavorite = this.addAFavorite.bind(this);
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites() {
    if (this.props.loggedInUser) {
      this.props.getUserFavorites('/api/user/favorites', this.props.loggedInUser.id );
    }
  }

  addAFavorite(imageId, index) {
    this.props.addToFavorites('/api/user/favorites', this.props.loggedInUser, imageId, this.props.recentImages, index);
  }

  render() {
    return (
      <div key={this.props.i}>
        <div className="overlay_container">
          { this.props.images.isFavorited ?
            <img src="./../../assets/icons/favorited.png" className="heart" onClick={ () => { this.addAFavorite(images.id, i); } }/> 
          : <img src="./../../assets/icons/heart.png" className="heart" onClick={ () => { this.addAFavorite(images.id, i); } }/> 
            }
        </div>
        <img src={this.props.images.url}/>
      </div>
    ); 
  }
}

// const mapStateToProps = (state) => {
//   return {

//     getFavoritesHasErrored: state.getFavoritesHasErrored,
//     getFavoritesIsLoading: state.getFavoritesIsLoading,
//     userFavorites: state.userFavorites
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getUserFavorites: (url, id) => dispatch(getUserFavorites(url, id)),
//     addToFavorites: (url, loggedInUser, imageId, imageArray, index) => dispatch(addToFavorites(url, loggedInUser, imageId, imageArray, index))
//   };
// };

export default Favorite;
// export default connect(mapStateToProps, mapDispatchToProps)(RecentTattoos);