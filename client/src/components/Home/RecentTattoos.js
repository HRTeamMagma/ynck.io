import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { recentImagesFetchData } from '../../../actions/actionRecentImages';
import { getUserFavorites, addToFavorites } from '../../../actions/actionFavorites';

class RecentTattoos extends React.Component {
  constructor(props) {
    super(props);

    this.getLatestImages = this.getLatestImages.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
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

  addToFavorites(imageId) {
    this.props.addToFavorites('/api/user/favorites', this.props.loggedInUser, imageId);
    // this.getFavorites();
  }

  render() {
    // var listOfFaves = [];
    // this.props.userFavorites.map((fave, i) => {
    //   listOfFaves.push(fave.id);
    // });

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
                        <img src="./assets/icons/favorited.png" className="heart" onClick={ () => { this.addToFavorites(image.id); } }/> 
                      : <img src="./assets/icons/heart.png" className="heart" onClick={ () => { this.addToFavorites(image.id); } }/> 
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
    addToFavorites: (url, loggedInUser, imageId) => dispatch(addToFavorites(url, loggedInUser, imageId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentTattoos);