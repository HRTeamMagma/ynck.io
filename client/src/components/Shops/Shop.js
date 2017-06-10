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

    this.state = {
      allowEdits: false,
      editAddress: false,
      editMode: false,
      editName: false,
      editedName: '',
      editedAddress: '',
      editedCity: ''
    };
  
    this.renderShopInfo = this.renderShopInfo.bind(this);
    this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);
    
    // hopeify.get('http://localhost:3000/api/profile/my-tattoos', function(res) {
    //   console.log(res);
    // });
    //use of store (REDUXIFIED api call)
    //2 is placeholder, in future it will come from either the user shop or shop that is selected in search
    this.props.fetchShopInfo('/api/shop', 2);
    console.log('proppppppp:', this.props);    
  }

  

  componentDidMount() {
    this.checkIfLoggedIn(loggedInUser.shop_id);
    var address = this.renderShopInfo('address1');
  }
  
  checkIfLoggedIn (userShopId) {
    if (userShopId === 2) {
      this.setState({allowEdits: true});
    }
   
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
          <h1 onClick={(e) => this.state.allowEdits ? this.setState({editName: true}) : null} className="profile_name">
            {!this.state.editName ? this.renderShopInfo('name') : (<input type="text" value={this.state.editedName} onChange={(e)=> this.setState({editedName: e.target.value})}/>)}
          </h1> 
          <div className="profile_sidebar">
            <img src={this.renderShopInfo('shop_image')} className="profile_image"/>
            <div onClick={(e) => this.state.allowEdits ? this.setState({editAddress: true, editedAddress: this.props.shop.shopInfo.address1, editedCity: this.props.shop.shopInfo.city}) : null}>
            {!this.state.editAddress ?
            <ShopInfo address1={this.renderShopInfo('address1')} address2={this.renderShopInfo('address2')} city={this.renderShopInfo('city')} state={this.renderShopInfo('state')} phone={this.renderShopInfo('phone')} rating={this.renderShopInfo('rating')}/>
            : (<div>
                <div>Address: 
                  <input type="text" value={this.state.editedAddress} onChange={(e)=> this.setState({editedAddress: e.target.value})}/>
                </div>
                  City: 
                  <input type="text" value={this.state.editedCity} onChange={(e)=> this.setState({editedCity: e.target.value})}/>
                  <div></div></div>)
            }
            </div>
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


