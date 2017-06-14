import axios from 'axios';

//addToProfileFavorites
export const profileFavoritesHasErrored = (bool) => {
  return {
    type: 'PROFILE_FAVORITES_HAS_ERRORED',
    profileFavoritesHasErrored: bool
  };
};

export const profileFavoritesIsLoading = (bool) => {
  return {
    type: 'PROFILE_FAVORITES_IS_LOADING',
    profileFavoritesIsLoading: bool
  };
};

export const profileFavoritesSuccess = () => {
  return {
    type: 'PROFILE_FAVORITES_SUCCESS',
  };
};

//megaAction
export const getProfileFavorites = (url, loggedInUserId, imageId) => {
  return (dispatch) => {
    dispatch(profileFavoritesIsLoading(true));
    axios.post(url, {
      loggedInUser: loggedInUserId,
      favoritedImage: imageId
    })
    .then(success => {
      let requestData = JSON.parse(success.config.data);
      dispatch(profileFavoritesIsLoading(false));
      dispatch(profileFavoritesSuccess(success));
    })
    .catch(error => {
      dispatch(profileFavoritesIsLoading(false));
      dispatch(profileFavoritesHasErrored(true));
    });
  };
};