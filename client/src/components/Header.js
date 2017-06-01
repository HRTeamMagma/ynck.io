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
          <nav>
            <li><a href="/login">Log in</a></li>
            <li><a href="/signup">Sign up</a></li>
          </nav>
        </div>
    );
  }
});

export default Header;