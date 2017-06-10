export const shop = (state = [], action) => {
  switch (action.type) {
  case 'SHOP_INFO_SUCCESS':
    return action.shopData;
  case 'UPDATE_SHOP_DATA_SUCCESS':
    return Object.assign({}, state, {
      shopInfo: Object.assign({}, state.shopInfo, {
        name: action.name,
        address1: action.address1,
        address2: action.address2,
        city: action.city
      })
    });
  default:
    return state;
  }
};