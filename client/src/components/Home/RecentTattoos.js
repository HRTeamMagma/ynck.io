import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class RecentTattoos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      user_favorites: []
      // favoritedImage: '' 
    };
    this.getLatestImages = this.getLatestImages.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    // this.toggleFavorite = this.toggleFavorite.bind(this);
    this.saveFavoriteStatus = this.saveFavoriteStatus.bind(this);
  }

  componentDidMount() {
    this.getLatestImages();
    this.getFavorites();
  }

  getLatestImages() {
    axios.get('/api/latest-images')
    .then((res) => {
      this.setState({
        images: res.data
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getFavorites() {
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

  //  TO DO: Set state dynamically so favorite status refreshes
  // toggleFavorite(imageID) {
  //   console.log('imageID', imageID)
  //   this.setState({
  //     favoritedImage: imageID
  //   })
  //   console.log('statefavoritedImage', this.state.favoritedImage)

  //   this.saveFavoriteStatus();
  // }

  saveFavoriteStatus(imageID) {
    axios.post('/api/user/favorites', {loggedInUser: this.props.loggedInUser, favoritedImage: imageID})
    .then((res) => {
      console.log('Successfully updated fave status');
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    var listOfFaves = [];
    this.state.user_favorites.map((fave, i) => {
      listOfFaves.push(fave.id);
    });

    return (
      <div className="feed_container">
        <div className="recent_tattoos">
          <h2>Recent tattoos</h2>
          <div className="image_grid">
              { this.state.images.map((image, i) => {
                return (
                  <div key={i} className="solo_image">
                    <div className="overlay_container">
                      { listOfFaves.includes(image.id) ? 
                        <img src="./assets/icons/favorited.png" className="heart" onClick={ () => { this.saveFavoriteStatus(image.id) } }/> 
                      : <img src="./assets/icons/heart.png" className="heart" onClick={ () => { this.saveFavoriteStatus(image.id) } }/> 
                        };
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


export default RecentTattoos;

