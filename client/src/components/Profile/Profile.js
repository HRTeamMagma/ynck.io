import React from 'react';
import axios from 'axios';

import UserInfo from './UserInfo';
import Feed from './Feed';
import Header from './../Header';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myTattoos: [],
    };

    axios.get(`/api/user/${this.props.loggedInUser.id}`, {
      params: {
        id: this.props.loggedInUser.id,
      }
    }).then((results) => {
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
        <Header />
        <UserInfo />
        <Feed myTattoos = {this.state.myTattoos}/>
      </div>
    );
  }
}

export default Profile;