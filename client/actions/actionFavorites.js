import axios from 'axios';

export const getFavoritesHasErrored = (bool) => {
  return {
    type: 'GET_FAVORITES_HAS_ERRORED',
    getFavoritesHasErrored: bool
  };
};

export const getFavoritesIsLoading = (bool) => {
  return {
    type: 'GET_FAVORITES_IS_LOADING',
    getFavoritesIsLoading: bool
  };
};

export const getFavoritesSuccess = (favoriteArray) => {
  return {
    type: 'GET_FAVORITES_SUCCESS',
    favoriteArray
  };
};

export const getUserFavorites = (url, id) => {
  return (dispatch) => {
    dispatch(getFavoritesIsLoading(true));
    axios.get(url, {
      params: {
        user_id: id
      }
    })
    .then(success => {
      dispatch(getFavoritesIsLoading(false));
      dispatch(getFavoritesSuccess(success.data));
    })
    .catch(error => {
      dispatch(getFavoritesIsLoading(false));
      dispatch(getFavoritesHasErrored(true));
    });
  };
};
