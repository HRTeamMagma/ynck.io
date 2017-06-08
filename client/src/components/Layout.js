import React from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import Home from './Home/Home';
import Header from './Header';
import Footer from './Footer';

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header loggedInUser={loggedInUser}/>
        { this.props.children }
        <Footer />
      </div>
    );
  }
}


export default Layout;
