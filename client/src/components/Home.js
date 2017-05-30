import React from 'react';
import Header from './Header';
import Banner from './Banner';
import RecentTattoos from './RecentTattoos';
import Footer from './Footer';

class Home extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {

    };
  }
  render () {
    return (
      <div>
        <Header />
        <Banner />
        <RecentTattoos />
        <Footer />
      </div>
    );
  }
}

export default Home;