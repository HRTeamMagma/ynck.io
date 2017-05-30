import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import Home from './Home';

class View extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
          <div>
            <Route exact path="/" component={Home} />
          </div>
        </BrowserRouter>
    )
  }
}


export default View;
