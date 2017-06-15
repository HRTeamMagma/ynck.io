export const allShops = (state = [], action) => {
  switch (action.type) {
  case 'GET_ALL_SHOPS_SUCCESS':
    return action.allShops.data;
  default:
    return state;
  }
};