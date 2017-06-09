export const shop = (state = [], action) => {
  switch (action.type) {
  case 'SHOP_INFO_SUCCESS':
    return action.shopData;
  default:
    return state;
  }
};