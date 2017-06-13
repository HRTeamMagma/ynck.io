export const searchIsLoading = ( state = false, action ) => {
  switch (action.type) {
  case 'SEARCH_RESULTS_ARE_LOADING' :
    return action.searchIsLoading;
  default:
    return state;
  }
};

export const searchResults = ( state = [], action ) => {
  switch (action.type) {
  case 'SEARCH_RESULTS_SUCCESS' :
    return action.searchResults;
  default:
    return state;
  }
};
