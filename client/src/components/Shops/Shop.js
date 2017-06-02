import React from 'react';
import Header from '../Header';
import ShopLeader from './ShopLeader';
import ShopLocation from './ShopLocation';
import OurWork from './OurWork';

const axios = require('axios');

// import hopeify from '../../../../hopeify';

class Shop extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      shop: {},
      images: [],
    };
    // hopeify.get('http://localhost:3000/api/profile/my-tattoos', function(res) {
    //   console.log(res);
    // });
    axios.get('/api/shop')
      .then((res) => {
        
        this.setState({shop: res.data.shopInfo, images: res.data.images});
        console.log(res, this.state.shop);
      })
      .catch(function(error) {
        console.log(error);
      });
        
      
  }
  render () {
    return (
      <div >
        <Header/>
        <div className="leader_box">
        <ShopLeader image={this.state.shop.profileImage} name={this.state.shop.name} rating={this.state.shop.rating} />
        </div>
        <ShopLocation address1={this.state.shop.address1} address2={this.state.shop.address2} city={this.state.shop.city} state={this.state.shop.state} phone={this.state.shop.phone}/>
        Our Work Muther Chuckers!!!
        { this.state.images.map(image => <OurWork image={image}/>)}

      </div>
    );
  }
}

export default Shop;

