import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { recentImages, recentImagesHasErrored, recentImagesIsLoading } from './reducerRecentImages';
import { getFavoritesIsLoading, getFavoritesHasErrored, userFavorites } from './reducerFavorites';
import { userDataIsLoading, userData } from './reducerUserInfo';
import { shop, shopInfoIsLoading } from './reducerShopInfo';
import { searchResults, searchIsLoading } from './reducerSearch';
import { userFollowing } from './reducerFollowing';
import { allShops } from './reducerAllShops';

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
  shopInfoIsLoading,
  searchIsLoading,
  searchResults,
  userFollowing,
  allShops,
  form: formReducer
});

export default rootReducer;

