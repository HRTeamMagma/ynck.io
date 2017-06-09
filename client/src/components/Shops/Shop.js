import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchShopInfo } from '../../../actions/actionShopInfo';


import ShopInfo from './ShopInfo';
import OurWork from './OurWork';
import MapView from './MapView';
import StarRating from 'react-star-rating';

// import hopeify from '../../../../hopeify';

class Shop extends React.Component {
  constructor(props) {
    super(props);
  
    this.renderShopInfo = this.renderShopInfo.bind(this);

    // hopeify.get('http://localhost:3000/api/profile/my-tattoos', function(res) {
    //   console.log(res);
    // });
    //use of store (REDUXIFIED api call)
    this.props.fetchShopInfo('/api/shop', 2);
    setTimeout( ()=> {
      console.log('the shpppp:', this.props.shop.lat);
    }, 1000);
  }

  

  componentDidMount() {
    
  }
  
  renderShopInfo (key) {
    if (key === 'lon' || key === 'lat' || key === 'images') {
      return this.props.shop ? this.props.shop[key] : null;
    }
    return this.props.shop.shopInfo ? this.props.shop.shopInfo[key] : null;
  }
  

  render () {
    return (
      <div >
        <div className="feed_container">
          <h1 className="profile_name">
            {this.renderShopInfo('name')}
            {/*{this.props.shop.shopInfo ? this.props.shop.shopInfo.name : null}*/}
          </h1> 
          <div className="profile_sidebar">
            <img src={this.renderShopInfo('shop_image')} className="profile_image"/>
            <ShopInfo address1={this.renderShopInfo('address1')} address2={this.renderShopInfo('address2')} city={this.renderShopInfo('city')} state={this.renderShopInfo('state')} phone={this.renderShopInfo('phone')} rating={this.renderShopInfo('rating')}/>
            <MapView lat={this.renderShopInfo('lat') || .34} lon={this.renderShopInfo('lon') || 32.5}/>
          </div>
          <div className="main_content">
            <OurWork images={this.renderShopInfo('images') || []}/>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    shop: state.shop
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchShopInfo: (url, id) => dispatch(fetchShopInfo(url, id))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Shop);


