import React from 'react';
import { Link } from 'react-router-dom';


class Footer extends React.Component {
  render () {
    return (
      <footer>
        <span>© Ynck 2017</span> | <Link to="/stats" className="footer-link">Stats</Link>
      </footer>
    );
  }
}

export default Footer;