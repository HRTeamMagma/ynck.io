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

export const profileFavoritesSuccess = (loggedInUserId, imageId, typeOfImage, i) => {
  return {
    type: 'PROFILE_FAVORITES_SUCCESS',
    loggedInUserId,
    imageId,
    typeOfImage, 
    i
  };
};

//megaAction
export const getProfileFavorites = (url, loggedInUser, imageId, typeOfImage, i) => {
  return (dispatch) => {
    dispatch(profileFavoritesIsLoading(true));
    axios.post(url, {
      loggedInUser: loggedInUser,
      favoritedImage: imageId
    })
    .then(success => {
      let requestData = JSON.parse(success.config.data);
      dispatch(profileFavoritesIsLoading(false));
      dispatch(profileFavoritesSuccess(loggedInUser.id, imageId, typeOfImage, i));
    })
    .catch(error => {
      dispatch(profileFavoritesIsLoading(false));
      dispatch(profileFavoritesHasErrored(true));
    });
  };
};