import axios from 'axios';

export const fetchUserDataSuccess = (userData) => {
  return {
    type: 'FETCH_USER_DATA_SUCCESS',
    userData
  };
};

export const fetchAllUserData = (url, userId) => {
  return (dispatch) => {
    axios.get(url, {params: {id: userId}})
    .then(success=> {
      dispatch(fetchUserDataSuccess(success.data));
    })
    .catch(error => {
      throw error;
    });  
  };   
};

export const updateUserDataSuccess = (userData, first, last, profile_description) => {
  return {
    type: 'UPDATE_USER_DATA_SUCCESS',
    userData,
    first,
    last,
    profile_description
  };
};

export const updateUserData = (url, userData, id, first, last, profile_description) => {
  console.log('updateUserData userData', userData);
  console.log('updateUserData first', first);
  console.log('updateUserData last', last);

  return (dispatch) => {
    axios.post(url, {
      id, 
      first,
      last,
      profile_description
    })
    .then(success => {
      dispatch(updateUserDataSuccess(userData, first, last, profile_description));
      console.log('userData', userData);
    });
  };
};


