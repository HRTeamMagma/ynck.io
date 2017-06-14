import axios from 'axios';

//getProfileFavorites
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

export const profileFavoritesSuccess = (profileFavorites) => {
  return {
    type: 'PROFILE_FAVORITES_SUCCESS',
    profileFavorites
  };
};

export const getProfileFavorites = (url, loggedInUserId, imageId) => {
  console.log('ACTION>>>>>>>', loggedInUserId, imageId);
  return (dispatch) => {
    dispatch(profileFavoritesIsLoading(true));
    axios.post(url, {
      loggedInUser: loggedInUserId,
      favoritedImage: imageId
    })
    .then(success => {
      console.log('profileFavoritesSuccess: ', success);
      dispatch(profileFavoritesIsLoading(false));
      dispatch(profileFavoritesSuccess(success.data));
    })
    .catch(error => {
      dispatch(profileFavoritesIsLoading(false));
      dispatch(profileFavoritesHasErrored(true));
    });
  };
};