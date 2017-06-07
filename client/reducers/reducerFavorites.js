export const getFavoritesHasErrored = ( state = false, action ) => {
  switch (action.type) {
  case 'GET_FAVORITES_HAS_ERRORED' :
    return action.getFavoritesHasErrored;
  default:
    return state;
  }
};

export const getFavoritesIsLoading = ( state = false, action ) => {
  switch (action.type) {
  case 'GET_FAVORITES_IS_LOADING' :
    return action.getFavoritesIsLoading;
  default:
    return state;
  }
};

export const userFavorites = ( state = [], action ) => {
  switch (action.type) {
  case 'GET_FAVORITES_SUCCESS' :
    return action.favoriteArray;
  default:
    return state;
  }
};
