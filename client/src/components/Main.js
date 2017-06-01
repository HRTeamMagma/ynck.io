import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import Home from './Home';

class Main extends React.Component {
  render() {
    return (
          <div>
            <Home /> 
          </div>
    );
  }
}


export default Main;
