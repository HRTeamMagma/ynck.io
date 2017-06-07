export const recentImagesHasErrored = (state = false, action) => {
  switch (action.type) {
    case 'RECENT_IMAGES_HAS_ERRORED':
      return action.recentImagesHasErrored;
    default:
      return state;
  }
};


export const recentImagesIsLoading = (state = false, action) => {
  switch (action.type) {
    case 'RECENT_IMAGES_IS_LOADING':
      return action.recentImagesIsLoading;
    default:
      return state;
  }
};


export const recentImages = (state = [], action) => {
  switch (action.type) {
    case 'RECENT_IMAGES_FETCH_DATA_SUCCESS':
      return action.recentImages;
    default:
      return state;
  }
};