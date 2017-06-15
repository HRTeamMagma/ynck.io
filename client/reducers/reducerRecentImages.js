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
    let stateCopy = state.slice();
    for (let i = 0; i < action.recentImages.length; i++) {
      stateCopy.push(action.recentImages[i]);
    }
    return stateCopy;
  case 'RECENT_IMAGE_WAS_FAVORITED':
    let i = action.i;
    return [
      ...state.slice(0, i),
      Object.assign({}, state[i], {
        isFavorited: !state[i].isFavorited
      }),
      ...state.slice(i + 1)
    ];
  default:
    return state;
  }
};
