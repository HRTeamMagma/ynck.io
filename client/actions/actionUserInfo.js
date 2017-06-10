import axios from 'axios';


export const userDataIsLoading = (bool) => {
  return {
    type: 'USER_DATA_IS_LOADING',
    userDataIsLoading: bool
  };
};


export const fetchUserDataSuccess = (userData) => {
  return {
    type: 'FETCH_USER_DATA_SUCCESS',
    userData
  };
};

export const fetchAllUserData = (url, userId) => {
  return (dispatch) => {
    dispatch(userDataIsLoading(true));
    axios.get(url, {params: {id: userId}})
    .then(success=> {
      dispatch(fetchUserDataSuccess(success.data));
      dispatch(userDataIsLoading(false));      
    })
    .catch(error => {
      throw error;
    });  
  };   
};

export const updateUserDataSuccess = (first, last, profile_description) => {
  return {
    type: 'UPDATE_USER_DATA_SUCCESS',
    first,
    last,
    profile_description
  };
};

export const updateUserData = (url, id, first, last, profile_description) => {

  return (dispatch) => {

    axios.post(url, {
      id, 
      first,
      last,
      profile_description
    })
    .then(success => {
      dispatch(updateUserDataSuccess(first, last, profile_description));
    });
  };
};


