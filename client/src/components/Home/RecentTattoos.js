import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { recentImagesFetchData } from '../../../actions/actionRecentImages';

class RecentTattoos extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   images: [],
    //   user_favorites: []
    // };
    this.getLatestImages = this.getLatestImages.bind(this);
    // this.getFavorites = this.getFavorites.bind(this);
    // this.saveFavoriteStatus = this.saveFavoriteStatus.bind(this);
  }

  componentDidMount() {
    this.getLatestImages();
    // this.getFavorites();
  }

  getLatestImages() {
    this.props.recentImagesFetchData('/api/latest-images');
  }

  getFavorites() {
    if (this.props.loggedInUser) {
      axios.get('/api/user/favorites', {
        params: { user_id: this.props.loggedInUser.id }
      })
      .then((res) => {
        this.setState({
          user_favorites: res.data.images
        });
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }


  saveFavoriteStatus(imageID) {
    axios.post('/api/user/favorites', {loggedInUser: this.props.loggedInUser, favoritedImage: imageID})
    .then((res) => {
      console.log('Successfully updated fave status');
      this.getFavorites();
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    // var listOfFaves = [];
    // this.state.user_favorites.map((fave, i) => {
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
                      {/*{ listOfFaves.includes(image.id) ? 
                        <img src="./assets/icons/favorited.png" className="heart" onClick={ () => { this.saveFavoriteStatus(image.id); } }/> 
                      : <img src="./assets/icons/heart.png" className="heart" onClick={ () => { this.saveFavoriteStatus(image.id); } }/> 
                        }*/}
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
    recentImagesIsLoading: state.recentImagesIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    recentImagesFetchData: (url) => dispatch(recentImagesFetchData(url))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentTattoos);