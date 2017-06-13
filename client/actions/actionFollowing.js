import axios from 'axios';

//getFollowing
export const getFollowingHasErrored = (bool) => {
  return {
    type: 'GET_FOLLOWING_HAS_ERRORED',
    getFollowingHasErrored: bool
  };
};

export const getFollowingIsLoading = (bool) => {
  return {
    type: 'GET_FOLLOWING_IS_LOADING',
    getFollowingIsLoading: bool
  };
};

export const getFollowingSuccess = (userFollowing) => {
  return {
    type: 'GET_FOLLOWING_SUCCESS',
    userFollowing
  };
};

export const getUserFollowing = (url, id) => {
  return (dispatch) => {
    dispatch(getFollowingIsLoading(true));
    axios.get(url, {
      params: {
        user_id: id
      }
    })
    .then(success => {
      dispatch(getFollowingIsLoading(false));
      dispatch(getFollowingSuccess(success.data.images));
    })
    .catch(error => {
      dispatch(getFollowingIsLoading(false));
      dispatch(getFollowingHasErrored(true));
    });
  };
};