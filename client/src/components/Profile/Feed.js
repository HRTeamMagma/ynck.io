import React from 'react';
import MyTattoos from './MyTattoos';
import MyDesigns from './MyDesigns';
import MyInspirations from './MyInspirations';
import { connect } from 'react-redux';
import { getProfileFavorites } from '../../../actions/actionProfileFavorites';

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.addToProfileFavorites = this.addToProfileFavorites.bind(this);
  }

  addToProfileFavorites(imageId, typeOfImage, i) {
    this.props.getProfileFavorites('/api/user/favorites', loggedInUser.id, imageId, typeOfImage, i);
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
        { this.props.myInspirations ?
          <MyInspirations myInspirations = {this.props.myInspirations}/>
          : null
        }
      </div>
    );
  }
}

//connect state to action
const mapStateToProps = (state) => {
  return {
    userData: state.userData
  };
};

//connects dispatch to action (fires the action)
const mapDispatchToProps = (dispatch) => {
  return {
    getProfileFavorites: (url, userId, imageId, typeOfImage, i) => dispatch(getProfileFavorites(url, userId, imageId, typeOfImage, i)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Feed);