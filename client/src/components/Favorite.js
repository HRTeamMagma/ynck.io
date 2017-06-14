import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addToFavorites } from '../../actions/actionRecentImages';



class Favorite extends React.Component {
  constructor(props) {
    super(props);

    this.addToFavorites = this.addToFavorites.bind(this);
  }

  addToFavorites(imageId) {
    axios.post('/api/user/favorites', {
      loggedInUser,
      favoritedImage: imageId
    })
    .then((success) => {
      console.log('IMAGE ADDED');
    });
  }

  render() {
    return (
      <div key={this.props.i}>
        <div className="overlay_container">
          { this.props.images.isFavorited ?
            <img src="./../../assets/icons/favorited.png" className="heart" onClick={ () => { this.addToFavorites(this.props.images.id); } }/> 
          : <img src="./../../assets/icons/heart.png" className="heart" onClick={ () => { this.addToFavorites(this.props.images.id); } }/> 
            }
        </div>
        <img src={this.props.images.url} />
      </div>
    ); 
  }
}

export default Favorite;