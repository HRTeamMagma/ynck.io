import React from 'react';
import axios from 'axios';

import UserInfo from './UserInfo';
import Feed from './Feed';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myTattoos: [],
    };

    axios.get('/api/profile/my-tattoos').then((results) => {
      this.setState({
        myTattoos: results.data.images,
      });
    }).catch((error) => {
      console.log(error);
    });

  }


  render() {
    return (
      <div>
        <UserInfo />
        <Feed myTattoos = {this.state.myTattoos}/>
      </div>
    );
  }
}

export default Profile;