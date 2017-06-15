import axios from 'axios';

export const shopInfo = (shopData) => {
  return {
    type: 'SHOP_INFO_SUCCESS',
    shopData
  };
};

export const fetchShopInfo = (url, shopId) => {
  return (dispatch) => {
    axios.get(url, {params: {shopId: shopId}})
      .then(success => {
        dispatch(shopInfo(success.data));
      })
      .catch(error => {
        throw error;
      });  
  };
};

export const updateShopDataSuccess = (name, address1, address2, city, state, phone) => {
  return {
    type: 'UPDATE_SHOP_DATA_SUCCESS',
    name,
    address1,
    address2,
    city,
    state,
    phone
  };
};

export const updateShopPhotosSuccess = (photoData) => {
  return {
    type: 'UPDATE_SHOP_IMAGE_SUCCESS',
    photoData
  };
};

export const updateShopData = (url, name, address1, address2, city, state, phone, cb) => {
  return (dispatch) => {
    axios.post(url, {
      name,
      address1,
      address2,
      city,
      state,
      phone
    })
    .then(success => {
      cb();
      dispatch(updateShopDataSuccess(name, address1, address2, city, state, phone));
    });
  };
};

//getAllShops
export const getAllShopsSuccess = (allShops) => {
  return {
    type: 'GET_ALL_SHOPS_SUCCESS',
    allShops,
  };
};

export const getAllShops = (url) => {
  return (dispatch) => {
    axios.get(url)
    .then((allShops) =>{
      dispatch(getAllShopsSuccess(allShops));
    })
    .catch(error => console.log(error));
  };
};