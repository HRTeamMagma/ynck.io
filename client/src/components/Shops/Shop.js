import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import ShopInfo from './ShopInfo';
import OurWork from './OurWork';
import MapView from './MapView';
import StarRating from 'react-star-rating';


const axios = require('axios');

// import hopeify from '../../../../hopeify';

class Shop extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      shop: {},
      images: [],
      lon: 51.0,
      lat: -0.09
    };
    // hopeify.get('http://localhost:3000/api/profile/my-tattoos', function(res) {
    //   console.log(res);
    // });

    axios.get('/api/shop', {params: {id: 2}})
      .then((res) => {
        this.setState({shop: res.data.shopInfo, images: res.data.images, lat: res.data.lat, lon: res.data.lon});
        console.log('lon: ', this.state.lon, 'lat: ', this.state.lat);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render () {
    var rating = Math.floor(this.state.shop.rating);

    return (
      <div >
        <Header loggedInUser={loggedInUser}/>
        <div className="feed_container">
          <h1 className="profile_name">
            {this.state.shop.name}
          </h1> 

          <div className="rating">       
            {this.state.shop.rating ?
              <StarRating name="disabled" size={20} totalStars={5} rating={rating} editing={false} disabled={true} />
              : null 
            }
          </div>

          <div className="profile_sidebar">
            <img src={this.state.shop.shop_image} className="profile_image"/>
            <ShopInfo address1={this.state.shop.address1} address2={this.state.shop.address2} city={this.state.shop.city} state={this.state.shop.state} phone={this.state.shop.phone} rating={this.state.shop.rating}/>
            <MapView lat={this.state.lat} lon={this.state.lon}/>
          </div>

          <div className="main_content">
            <OurWork images={this.state.images}/>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Shop;

