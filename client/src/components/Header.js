import React from 'react';
import Search from './Search';
import { Route, Link, BrowserRouter } from 'react-router-dom';


const Header = React.createClass ({
  render () {
    return (
        <div className="site_header">
          <div className="logo">
            <Link to="/"><h1>Ynck</h1></Link>
          </div>
          <nav>
            <li><Link to="/login">Log in</Link></li>
            <li><Link to="/signup">Sign up</Link></li>
          </nav>
        </div>
    );
  }
});

export default Header;