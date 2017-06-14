import React from 'react';
import axios from 'axios';
import MyTattoos from './MyTattoos';
import MyDesigns from './MyDesigns';
import MyFavorites from './MyFavorites';
import { connect } from 'react-redux';
import { getProfileFavorites } from '../../../actions/actionProfileFavorites';

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      favoritedImages: []
    };

    this.addToProfileFavorites = this.addToProfileFavorites.bind(this);
    this.grabFavorites = this.grabFavorites.bind(this);
  }

  componentDidMount() {
    this.grabFavorites();
  }

  grabFavorites() {
    console.log('triggered', loggedInUser.id);
    axios.get('/api/user/favorites', {
      params: {
        user_id: loggedInUser.id,
      }
    })
    .then((success) => {
      this.setState({
        favoritedImages: success.data.images,
      });
    })
    .catch(error => console.log(error));
  }

  addToProfileFavorites(imageId, typeOfImage, i) {
    this.props.getProfileFavorites('/api/user/favorites', loggedInUser, imageId, typeOfImage, i);
  } 

  render() {
    return (
      <div className="user_stream">
        
        { this.props.userData.tattoo ?
          <MyTattoos myTattoos = {this.props.userData.tattoo} addToProfileFavorites={this.addToProfileFavorites}/>
          : null 
        }
        { this.props.userData.design ?
          <MyDesigns myDesigns = {this.props.userData.design} addToProfileFavorites={this.addToProfileFavorites}/>
          : null
        }
        { this.state.favoritedImages.length > 0 ?
          <MyFavorites myFavorites = {this.state.favoritedImages}/>
          : null
        }
      </div>
    );
  }
}

//connect state to action
const mapStateToProps = (state) => {
  return {
    userData: state.userData,
  };
};

//connects dispatch to action (fires the action)
const mapDispatchToProps = (dispatch) => {
  return {
    getProfileFavorites: (url, userId, imageId, typeOfImage, i) => dispatch(getProfileFavorites(url, userId, imageId, typeOfImage, i)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);