import React from 'react';
import Header from './../Header';
import Banner from './Banner';
import RecentTattoos from './RecentTattoos';
import Footer from './../Footer';
import Layout from './../Layout';

class Home extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
    };
  }
  render () {
    return (
      <Layout>
        <div className="homeContainer">
          <Banner />
          <RecentTattoos loggedInUser={this.props.loggedInUser}/>
        </div>
       </Layout>
    );
  }
}

export default Home;
