import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import Home from './Home';

class Main extends React.Component {
  render() {
    return (
          <div>
            Hello
            {this.props.comments.Devon[0].text}
            <Home /> 
            
          </div>
    );
  }
}


export default Main;
