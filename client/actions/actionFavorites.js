import axios from 'axios';

//getFavorites
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

export const getFavoritesSuccess = (userFavorites) => {
  return {
    type: 'GET_FAVORITES_SUCCESS',
    userFavorites
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
      dispatch(getFavoritesSuccess(success.data.images));
    })
    .catch(error => {
      dispatch(getFavoritesIsLoading(false));
      dispatch(getFavoritesHasErrored(true));
    });
  };
};


//addToFavorites
export const addToFavoritesHasErrored = (bool) => {
  return {
    type: 'ADD_TO_FAVORITES_HAS_ERRORED',
    bool
  };
};

export const addToFavoritesIsLoading = (bool) => {
  return {
    type: 'ADD_TO_FAVORITES_IS_LOADING',
    bool
  };
};

export const addToFavoritesSuccess = (bool) => {
  return {
    type: 'ADD_TO_FAVORITES_SUCCESS',
    bool
  };
};

export const addToFavorites = (url, loggedInUser, imageId) => {
  return (dispatch) => {
    dispatch(addToFavoritesIsLoading(true));
    axios.post(url, {
      loggedInUser: loggedInUser,
      favoritedImage: imageId
    })
    .then(success => {
      dispatch(addToFavoritesIsLoading(false));
      dispatch(addToFavoritesSuccess(true));
    })
    .catch(error => {
      dispatch(addToFavoritesHasErrored(true));
    });
  };
};