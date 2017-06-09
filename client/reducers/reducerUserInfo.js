export const userData = (state = [], action) => {
  switch (action.type) {
  case 'FETCH_USER_DATA_SUCCESS':
    return action.userData;
  case 'UPDATE_USER_DATA_SUCCESS':
    console.log('action first', action.first);
    console.log('state', state);

    return Object.assign({}, state, {
      first: action.first,
      last: action.last,
      profile_description: action.profile_description
    });
  default:
    return state;
  }
};
