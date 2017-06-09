import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { connect } from 'react-redux';
import '../../public/stylesheets/main.scss'; 


import store from './store';
import Layout from './components/Layout';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  componentDidMount() {
    // this.getUserInfo();
  }
  getUserInfo() {
    if (loggedInUser) {
      this.props.fetchAllUserData('/api/profiles/user-data', loggedInUser);
    }
  }
  render() {
    return (
      <Provider store={store}>
        <Layout/>
      </Provider>
    
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     userData: state.userData
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchAllUserData: (url, id) => dispatch(fetchAllUserData(url, id))
//   };
// };

// connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(<App/>, document.getElementById('root'));
