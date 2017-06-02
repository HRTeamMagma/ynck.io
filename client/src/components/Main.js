import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import Home from './Home/Home';
import Header from './Header';
import Footer from './Footer';

class Main extends React.Component {
  render() {
    return (
      <div>
        <Header loggedInUser={loggedInUser}/>
        <Home /> 
        <Footer />
      </div>
    );
  }
}


export default Main;
