import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';

import { recentImages, recentImagesHasErrored, recentImagesIsLoading } from './reducerRecentImages';

const rootReducer = combineReducers({
  recentImages, 
  recentImagesHasErrored,
  recentImagesIsLoading
  // routing: routerReducer
});

export default rootReducer;

