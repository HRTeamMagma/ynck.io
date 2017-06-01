import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';

class Main extends React.Component {
  render() {
    return (
      <div>
        {console.log('user logged in:' + userFromServer + !!userFromServer)}
        <Header />
        <Home /> 
        { this.props.children }
        <Footer />
      </div>
    );
  }
}


export default Main;
