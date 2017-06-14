import axios from 'axios';


export const searchIsLoading = (bool) => {
  return {
    type: 'SEARCH_RESULTS_ARE_LOADING',
    userDataIsLoading: bool
  };
};


export const searchResultsSuccess = (searchResults) => {
  return {
    type: 'SEARCH_RESULTS_SUCCESS',
    searchResults
  };
};

export const search = (url, searchTerm, searchType, callback) => {
  return (dispatch) => {
    dispatch(searchIsLoading(true));
    axios.get(url, {
      params: { q: searchTerm, searchType: searchType }
    })
    .then(success => {
      dispatch(searchResultsSuccess(success.data));
      dispatch(searchIsLoading(false));      
      callback();
    })
    .catch(error => {
      throw error;
    });  
  };   
};
