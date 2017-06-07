import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import comments from './comments';

const rootReducer = combineReducers({comments, latestImages, shopImages, shopInfo, shopLat, shopLon, userDesigns, userFavorites, userInfo, userInspirations, userTattoos, routing: routerReducer});

export default rootReducer;

