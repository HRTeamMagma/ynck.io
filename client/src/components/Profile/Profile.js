import React from 'react';
import axios from 'axios';

import UserInfo from './UserInfo';
import Feed from './Feed';
import Layout from './../Layout';

import Header from './../Header';
import Footer from './../Footer';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myTattoos: [],
      myDesigns: [],
      myInspirations: [],
      userInfo: [],
    };
    this.getUserImages = this.getUserImages.bind(this);
    // this.getUserInfo = this.getUserInfo.bind(this);
  }

  componentDidMount() {
    this.getUserImages();
  }

  getUserImages() {
    axios.get('/api/profiles/images', {
      params: {
        id: this.props.match.params.id,
      }
    })
    .then((results) => {
      console.log(results.data.userProfile);
      this.setState({
        myTattoos: results.data.tattoo,
        myDesigns: results.data.design,
        myInspirations: results.data.inspiration,
        userInfo: results.data.userProfile
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  // getUserInfo() {
  //   axios.get(`/api/profiles/${this.props.match.params.id}`)
  //   .then((results) => {
  //     this.setState({
  //       userInfo: results.data,
  //     });
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // }

  render() {
    return (
      <Layout>
      <div>
        {/*<Header loggedInUser={loggedInUser}/>*/}
        <div className="feed_container">
          <div className="profile_sidebar">
            <UserInfo userInfo = {this.state.userInfo}/>
          </div>
          <div className="main_content">
            <Feed myTattoos = {this.state.myTattoos} myDesigns = {this.state.myDesigns} myInspirations = {this.state.myInspirations}/>
          </div>
        </div>
        {/*<Footer />*/}
      </div></Layout>
    );
  }
}

export default Profile;