import axios from 'axios';

export const shopInfo = (shopData) => {
  return {
    type: 'SHOP_INFO_SUCCESS',
    shopData
  };
};


export const fetchShopInfo = (url) => {
  return (dispatch) => {
    axios.get(url)
      .then(success => {
        dispatch(shopInfo(success.data));
      })
      .catch(error => {
        throw error;
      });  
  };
};

export const updateShopDataSuccess = (name, address1, address2, city) => {
  return {
    type: 'UPDATE_SHOP_DATA_SUCCESS',
    name,
    address1,
    address2,
    city
  };
};

export const updateShopData = (url, name, address1, address2, city) => {
  return (dispatch) => {
    axios.post(url, {
      name,
      address1,
      address2,
      city
    })
    .then(success => {
      dispatch(updateShopDataSuccess(name, address1, address2, city));
    });
  };
};