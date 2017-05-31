import { bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionCreators';

import Main from './Main';


var mapStateToProps = function (state) {
  return {
    posts: state.posts,
    comments: state.comments
  };
};

var mapDispatchToProps = function (dispatch) {
  return bindActionCreators(actionCreators, dispatch);
};

const ReduxComp = connect(mapStateToProps, mapDispatchToProps)(Main);


export default ReduxComp;