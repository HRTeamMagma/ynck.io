import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchAllUserData, updateUserData } from './../../../actions/actionUserInfo';

import UserInfo from './UserInfo';
import Feed from './Feed';

import Following from './Following';
import { CometSpinLoader } from 'react-css-loaders';

import UploadForm from './UploadForm';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false
    };
    this.getUserData = this.getUserData.bind(this);
    this.saveEdits = this.saveEdits.bind(this);
    this.handleEditProfile = this.handleEditProfile.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.followUser = this.followUser.bind(this);
  }

  handleEditProfile(e) {
    e.preventDefault();
    this.setState({
      editMode: true
    });
  }

  cancelEdit(e) {
    e.preventDefault();
    this.setState({
      editMode: false
    });
  }

  componentDidMount() {
    this.getUserData();
  }

  getUserData() {
    this.props.fetchAllUserData('/api/profiles/user-data', this.props.match.params.id);
  }

  saveEdits(firstName, lastName, description) {  
    this.props.updateUserData('/api/user/edit', loggedInUser.id, firstName, lastName, description);
    this.setState({
      editMode: false
    });
  }
  
  // TODO 
  followUser(e) {
    console.log('follow user called');
  }
  
  render() {

    return (
      <div>
        <UploadForm image_type="design" />
        <div className="feed_container">
          {this.props.userDataIsLoading ? <CometSpinLoader /> : null }
          <div className="profile_sidebar">
            { this.props.userData.userProfile ? 
              <div>
                <UserInfo userData = {this.props.userData.userProfile} saveEdits = { this.saveEdits } 
                handleEditProfile = { this.handleEditProfile } cancelEdit = { this.cancelEdit } editMode = { this.state.editMode } 
                followUser = { this.followUser } />
                <Following />
              </div>  
              : null
            }  
          </div>

          <div className="main_content">
            { this.props.userData ? 
              <Feed myTattoos = {this.props.userData.tattoo} myDesigns = {this.props.userData.design} myInspirations = {this.props.userData.inspiration}/>
              : null 
            }
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    userDataIsLoading: state.userDataIsLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUserData: (url, id) => dispatch(fetchAllUserData(url, id)),
    updateUserData: (url, id, firstName, lastName, profile_description) => dispatch(updateUserData(url, id, firstName, lastName, profile_description))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
