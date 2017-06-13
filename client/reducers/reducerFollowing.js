//userFollowing

export const userFollowing = ( state = [], action ) => {
  switch (action.type) {
  case 'GET_FOLLOWING_SUCCESS' :
    return action.userFollowing;
  default:
    return state;
  }
};
