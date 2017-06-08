import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { recentImagesFetchData, addToFavorites } from '../../../actions/actionRecentImages';
import { getUserFavorites } from '../../../actions/actionFavorites';

class RecentTattoos extends React.Component {
  constructor(props) {
    super(props);

    this.getLatestImages = this.getLatestImages.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.addAFavorite = this.addAFavorite.bind(this);
  }

  componentDidMount() {
    this.getLatestImages();
    this.getFavorites();
  }

  getLatestImages() {
    this.props.recentImagesFetchData('/api/latest-images');
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

    if (this.props.recentImagesHasErrored) {
      return <p>Sorry! There was an error loading the items</p>;
    }
    if (this.props.recentImagesIsLoading) {
      return <p>Loading…</p>;
    }

    return (
      <div className="feed_container">
        <div className="recent_tattoos">
          <h2>Recent tattoos</h2>

          <div className="image_grid">
              { this.props.recentImages.map((image, i) => {
                return (
                  <div key={i} className="solo_image">
                    <div className="overlay_container">
                      { image.isFavorited ?
                        <img src="./assets/icons/favorited.png" className="heart" onClick={ () => { this.addAFavorite(image.id, i); } }/> 
                      : <img src="./assets/icons/heart.png" className="heart" onClick={ () => { this.addAFavorite(image.id, i); } }/> 
                        }
                    </div>
                    <img src={image.url} className="base_pic" />
                  </div>
                ); 
              })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recentImages: state.recentImages,
    recentImagesHasErrored: state.recentImagesHasErrored,
    recentImagesIsLoading: state.recentImagesIsLoading,
    getFavoritesHasErrored: state.getFavoritesHasErrored,
    getFavoritesIsLoading: state.getFavoritesIsLoading,
    userFavorites: state.userFavorites
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    recentImagesFetchData: (url) => dispatch(recentImagesFetchData(url)),
    getUserFavorites: (url, id) => dispatch(getUserFavorites(url, id)),
    addToFavorites: (url, loggedInUser, imageId, imageArray, index) => dispatch(addToFavorites(url, loggedInUser, imageId, imageArray, index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentTattoos);