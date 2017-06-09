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