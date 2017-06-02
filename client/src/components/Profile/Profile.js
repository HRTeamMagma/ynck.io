import React from 'react';
import UserInfo from './UserInfo';
import Feed from './Feed';

class Profile extends React.Component {
  render() {
    return (
      <div>
        <UserInfo />
        <Feed />
      </div>
    );
  }
}

export default Profile;