export const shopInfoIsLoading = (state = false, action) => {
  switch (action.type) {
  case 'SHOP_INFO_IS_LOADING':
    return action.shopInfoIsLoading;
  default:
    return state;
  }
};


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
        city: action.city,
        state: action.state,
        phone: action.phone
      })
    });
  case 'UPDATE_SHOP_IMAGE_SUCCESS':
    let imageCopy = state.images.slice();
    imageCopy.push(action.photoData);
    return Object.assign({}, state, {
      images: imageCopy
    });
  default:
    return state;
  }
};