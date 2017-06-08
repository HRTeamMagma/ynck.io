import React from 'react';

import Banner from './Banner';
import RecentTattoos from './RecentTattoos';


class Home extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
    };
  }
  render () {
    return (
      <div className="homeContainer">
        <Banner />
        <RecentTattoos loggedInUser={this.props.loggedInUser}/>
      </div>
    );
  }
}

export default Home;
