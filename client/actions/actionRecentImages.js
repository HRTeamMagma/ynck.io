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


export const recentImagesFetchData = (url) => {
  return (dispatch) => {
    dispatch(recentImagesIsLoading(true));
    axios.get(url)
    .then((images) => { 
      dispatch(recentImagesFetchDataSuccess(images.data));
      dispatch(recentImagesIsLoading(false));
    })
    .catch(() => dispatch(recentImagesHasErrored(true)));
  };
};


