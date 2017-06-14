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

export const search = (url, searchInput, searchType) => {
  return (dispatch) => {
    dispatch(searchIsLoading(true));
    axios.get(url, {
      params: { q: searchInput, searchType: searchType }
    })
    .then(success => {
      dispatch(searchResultsSuccess(success.data));
      dispatch(searchIsLoading(false));      
    })
    .catch(error => {
      throw error;
    });  
  };   
};
