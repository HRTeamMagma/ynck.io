import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateIsFollowing, fetchAllUserData, updateUserData } from './../../../actions/actionUserInfo';
import { getUserFollowing } from './../../../actions/actionFollowing';

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
    this.showFollowing = this.showFollowing.bind(this);
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
    this.showFollowing();
  }

  getUserData() {
    this.props.fetchAllUserData('/api/profiles/user-data', this.props.match.params.id);
  }

  showFollowing() {
    this.props.getUserFollowing('/api/following', this.props.match.params.id);
  }

  saveEdits(firstName, lastName, description) {  
    this.props.updateUserData('/api/user/edit', loggedInUser.id, firstName, lastName, description, () => {
      this.setState({
        editMode: false
      });
    });
  }

  
  followUser(e, follows) {
    this.props.updateIsFollowing('/api/following', follows);
  }
  
  render() {

    return (
      <div>
        {console.log('propsFromInsideProfile: ', this.props)}
        <UploadForm image_type="design" />
        <div className="feed_container">
          {this.props.userDataIsLoading ? <CometSpinLoader /> : null }
          <div className="profile_sidebar">
            { this.props.userData.userProfile ? 
              <div>
                <UserInfo userData = {this.props.userData.userProfile} saveEdits = { this.saveEdits } 
                handleEditProfile = { this.handleEditProfile } cancelEdit = { this.cancelEdit } editMode = { this.state.editMode } 
                followUser = { this.followUser } isBeingFollowed={this.props.userData.isBeingFollowed} />
                <Following usersFollowing={this.props.userFollowing}/>
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

//connect state to action
const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    userDataIsLoading: state.userDataIsLoading,
    userFollowing: state.userFollowing
  };
};
//connects dispatch to action (fires the action)
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUserData: (url, id) => dispatch(fetchAllUserData(url, id)),
    updateUserData: (url, id, firstName, lastName, profile_description, callback) => dispatch(updateUserData(url, id, firstName, lastName, profile_description, callback)),
    updateIsFollowing: (url, followeeId) => dispatch(updateIsFollowing(url, followeeId)),
    getUserFollowing: (url, id) => dispatch(getUserFollowing(url, id))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
