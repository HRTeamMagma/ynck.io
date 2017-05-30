import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter } from 'react-router-dom';


class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>This is the homepage</div>
    );
  }
}

export default Home;