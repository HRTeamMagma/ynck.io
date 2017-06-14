import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { recentImages, recentImagesHasErrored, recentImagesIsLoading } from './reducerRecentImages';
import { getFavoritesIsLoading, getFavoritesHasErrored, userFavorites } from './reducerFavorites';
import { userDataIsLoading, userData } from './reducerUserInfo';
import { shop } from './reducerShopInfo';
import { searchResults, searchIsLoading } from './reducerSearch';
import { userFollowing } from './reducerFollowing';
import { profileFavorites } from './reducerProfileFavorites'; 

const rootReducer = combineReducers({
  recentImages, 
  recentImagesHasErrored,
  recentImagesIsLoading,
  getFavoritesHasErrored,
  getFavoritesIsLoading,
  userFavorites,
  userDataIsLoading,
  userData,
  shop,
  searchIsLoading,
  searchResults,
  userFollowing,
  profileFavorites,
  form: formReducer
});

export default rootReducer;

