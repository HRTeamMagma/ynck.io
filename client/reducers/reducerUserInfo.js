export const userDataIsLoading = (state = false, action) => {
  switch (action.type) {
  case 'USER_DATA_IS_LOADING':
    return action.userDataIsLoading;
  default:
    return state;
  }
};


export const userData = (state = [], action) => {
  switch (action.type) {
  case 'FETCH_USER_DATA_SUCCESS':
    return action.userData;
  case 'UPDATE_FOLLOWING_SUCCESS':
    return Object.assign({}, state, {
      isBeingFollowed: !state.isBeingFollowed
    });
  case 'UPDATE_USER_DATA_SUCCESS':
    return Object.assign({}, state, {
      userProfile: Object.assign({}, state.userProfile, {
        first: action.first,
        last: action.last,
        profile_description: action.profile_description
      })
    });
  case 'UPDATE_USER_PHOTO_SUCCESS':
    if (action.photoData.image_type === 'tattoo') {
      let newArray = state.tattoo.slice();
      newArray.push(action.photoData);
      return Object.assign({}, state, {
        tattoo: newArray
      });
    } else if (action.photoData.image_type === 'design') {
      let newArray = state.design.slice();
      newArray.push(action.photoData);
      return Object.assign({}, state, {
        design: newArray
      });
    } else if (actton.photoData.image_type === 'inspiration') {
      let newArray = state.inspiration.slice();
      newArray.push(action.photoData);
      return Object.assign({}, state, {
        inspiration: newArray
      });
    }
  default:
    return state;
  }
};
