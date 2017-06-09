import { combineReducers } from 'redux';

import { recentImages, recentImagesHasErrored, recentImagesIsLoading } from './reducerRecentImages';
import { getFavoritesIsLoading, getFavoritesHasErrored, userFavorites } from './reducerFavorites';
import { userData } from './reducerUserInfo';



const rootReducer = combineReducers({
  recentImages, 
  recentImagesHasErrored,
  recentImagesIsLoading,
  getFavoritesHasErrored,
  getFavoritesIsLoading,
  userFavorites,
  userData

});

export default rootReducer;

