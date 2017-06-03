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

    axios.get('/api/profiles/images', {
      params: {
        id: loggedInUser.id,
      }
    }).then((results) => {
      console.log(results);
      this.setState({
        myTattoos: results.data.design,
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