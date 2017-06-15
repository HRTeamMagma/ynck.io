import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import '../../public/stylesheets/main.scss'; 


import store from './store';
import Main from './components/Main';


class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Main/>
      </Provider>
    );
  }
}


ReactDOM.render(<App/>, document.getElementById('root'));
