import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getProfileFavorites } from '../../actions/actionProfileFavorites';



class Favorite extends React.Component {
  constructor(props) {
    super(props);

    this.addToProfileFavorites = this.addToProfileFavorites.bind(this);
  }

  addToProfileFavorites(imageId) {
    this.props.getProfileFavorites('/api/user/favorites', loggedInUser.id, imageId);
  }  

  render() {
    return (
      <div key={this.props.i}>
        <div className="overlay_container">
          {/*{ this.state.isFavorited ?
            <img src="./../../assets/icons/favorited.png" className="heart" onClick={ () => { this.addToFavorites(this.props.images.id); } }/> 
          : */}
            <img src="./../../assets/icons/heart.png" className="heart" onClick={ () => { this.addToProfileFavorites(this.props.images.id); } }/> 
            {/*}*/}
        </div>
        <img src={this.props.images.url} />
      </div>
    ); 
  }
}

//connect state to action
const mapStateToProps = (state) => {
  return {
    profileFavorites: state.profileFavorites
  };
};

//connects dispatch to action (fires the action)
const mapDispatchToProps = (dispatch) => {
  return {
    getProfileFavorites: (url, userId, imageId) => dispatch(getProfileFavorites(url, userId, imageId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);