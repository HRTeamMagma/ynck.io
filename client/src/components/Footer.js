import React from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';


const Footer = React.createClass ({
  render () {
    return (
      <footer>
        <Link to="/about">About</Link>
      </footer>
    );
  }
});

export default Footer;