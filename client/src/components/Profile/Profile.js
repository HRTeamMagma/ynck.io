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
      myDesigns: [],
      myInspirations: [],
    };

    axios.get('/api/profiles/images', {
      params: {
        id: loggedInUser.id,
      }
    }).then((results) => {
      console.log(results);
      this.setState({
        myTattoos: results.data.tattoo,
        myDesigns: results.data.design,
        myInspirations: results.data.inspiration
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
        <Feed myTattoos = {this.state.myTattoos} myDesigns = {this.state.myDesigns} myInspirations = {this.state.myInspirations}/>
      </div>
    );
  }
}

export default Profile;