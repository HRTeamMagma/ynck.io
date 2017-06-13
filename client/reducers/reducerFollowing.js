//userFollowing
export const getFollowingHasErrored = ( state = false, action ) => {
  switch (action.type) {
  case 'GET_FOLLOWING_HAS_ERRORED' :
    return action.getFollowingHasErrored;
  default:
    return state;
  }
};

export const getFollowingIsLoading = ( state = false, action ) => {
  switch (action.type) {
  case 'GET_FOLLOWING_IS_LOADING' :
    return action.getFollowingIsLoading;
  default:
    return state;
  }
};

export const userFollowing = ( state = [], action ) => {
  switch (action.type) {
  case 'GET_FOLLOWING_SUCCESS' :
    return action.userFollowing;
  default:
    return state;
  }
};
