//profileFavorites

export const profileFavorites = ( state = [], action ) => {
  switch (action.type) {
  case 'PROFILE_FAVORITES_SUCCESS' :
    return action.profileFavorites;
  default:
    return state;
  }
};
