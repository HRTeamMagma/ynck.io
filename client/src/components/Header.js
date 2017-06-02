import React from 'react';
import Search from './Home/Search';
import { Route, Link, BrowserRouter } from 'react-router-dom';


const Header = React.createClass ({
  render () {
    return (
        <div className="site_header">
          <div className="logo">
            <Link to="/"><h1>ynck</h1></Link>
          </div>
          {this.props.loggedInUser ? (
            <nav>
              <li><a href="/logout">Log out</a></li>
              <li> { this.props.loggedInUser.first } </li>
            </nav>
            ) : (
            <nav>
              <li><a href="/signup">Sign up</a></li>
              <li><a href="/login">Log in</a></li>              
            </nav>
            )}

        </div>
    );
  }
});

export default Header;