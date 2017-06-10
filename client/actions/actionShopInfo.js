import axios from 'axios';

export const shopInfo = (shopData) => {
  return {
    type: 'SHOP_INFO_SUCCESS',
    shopData
  };
};

export const fetchShopInfo = (url, userId) => {
  return (dispatch) => {
    axios.get(url, {params: {id: userId}})
      .then(success => {
        
        dispatch(shopInfo(success.data));
      })
      .catch(error => {
        throw error;
      });  
  };
};