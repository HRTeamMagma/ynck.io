import axios from 'axios';

export const recentImagesHasErrored = (bool) => {
  return {
    type: 'RECENT_IMAGES_HAS_ERRORED',
    recentImagesHasErrored: bool
  };
};


export const recentImagesIsLoading = (bool) => {
  return {
    type: 'RECENT_IMAGES_IS_LOADING',
    recentImagesIsLoading: bool
  };
};


export const recentImagesFetchDataSuccess = (recentImages) => {
  return {
    type: 'RECENT_IMAGES_FETCH_DATA_SUCCESS',
    recentImages
  };
};


export const recentImagesFetchData = (url, pageNum, cb) => {
  return (dispatch) => {
    dispatch(recentImagesIsLoading(true));
    axios.get(url, {
      params: {
        pageNum
      }
    })
    .then((images) => { 
      dispatch(recentImagesFetchDataSuccess(images.data));
      dispatch(recentImagesIsLoading(false));
      cb();
    })
    .catch(() => {
      dispatch(recentImagesHasErrored(true));
      cb();
    });
  };
};


export const addToFavoritesIsLoading = (bool) => {
  return {
    type: 'ADD_TO_FAVORITES_IS_LOADING',
    bool
  };
};

export const addToFavoritesSuccess = (recentImages, i) => {
  return {
    type: 'RECENT_IMAGE_WAS_FAVORITED',
    recentImages: recentImages,
    i
  };
};

export const addToFavoritesHasErrored = (bool) => {
  return {
    type: 'ADD_TO_FAVORITES_HAS_ERRORED',
    bool
  };
};


export const addToFavorites = (url, loggedInUser, imageId, recentImages, index) => {
  return (dispatch) => {
    dispatch(addToFavoritesIsLoading(true));
    axios.post(url, {
      loggedInUser: loggedInUser,
      favoritedImage: imageId
    })
    .then(success => {
      dispatch(addToFavoritesIsLoading(false));
      dispatch(addToFavoritesSuccess(recentImages, index));
    })
    .catch(error => {
      dispatch(addToFavoritesHasErrored(true));
    });
  };
};