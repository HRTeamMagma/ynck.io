import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchShopInfo, updateShopData } from '../../../actions/actionShopInfo';

import ShopInfo from './ShopInfo';
import OurWork from './OurWork';
import MapView from './MapView';
import StarRating from 'react-star-rating';


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
      editedCity: '',
      editedOffice: '',
      editedState: '',
      editedPhone: ''
    };

    this.renderShopInfo = this.renderShopInfo.bind(this);
    this.checkIfLoggedIn = this.checkIfLoggedIn.bind(this);
    this.saveEdits = this.saveEdits.bind(this);
    
    // hopeify.get('http://localhost:3000/api/profile/my-tattoos', function(res) {
    //   console.log(res);
    // });
    //use of store (REDUXIFIED api call)
    //2 is placeholder, in future it will come from either the user shop or shop that is selected in search
    this.props.fetchShopInfo('/api/shop');
  }

  componentDidMount() {
    this.checkIfLoggedIn(loggedInUser.shop_id);
    var address = this.renderShopInfo('address1');
  }
  
  checkIfLoggedIn (userShopId) {
    if (loggedInUser.shop_id) {
      this.setState({allowEdits: true});
    }
  }

  renderShopInfo (key) {
    if (key === 'lon' || key === 'lat' || key === 'images') {
      return this.props.shop ? this.props.shop[key] : null;
    }
    return this.props.shop.shopInfo ? this.props.shop.shopInfo[key] : null;
  }

  saveEdits (name, address1, address2, city, state, phone) {
    this.props.updateShopData('/api/shop', name, address1, address2, city, state, phone, () => {
      this.setState({editAddress: false, editName: false }, ()=> {
        this.props.fetchShopInfo('/api/shop');
      });
    });
  }

  render () {
    return (
      <div >
        <div className="feed_container">
          <h1 onClick={(e) => this.state.allowEdits ? this.setState({editName: true, editedName: this.state.editedName || this.props.shop.shopInfo.name}) : null} className="profile_name">
            {!this.state.editName ? this.renderShopInfo('name') : ''}
          </h1> 
            {this.state.editName ? 
            (<div>
                <input type="text" value={this.state.editedName} onChange={(e)=> this.setState({editedName: e.target.value})}/>
              <div>
                  <div>
                  <a href="#" onClick={(e) => this.setState({editName: false})}>Cancel</a>
                  </div>
                <div>
                  <a href="#" onClick={(e) => this.saveEdits(this.state.editedName, this.props.shop.shopInfo.address1, this.props.shop.shopInfo.address2, this.props.shop.shopInfo.city)}>Save Changes</a>
                </div>
              </div>
            </div>) : ''}
          
          <div className="profile_sidebar">
            <img src={this.renderShopInfo('shop_image')} className="profile_image"/>
            <div onClick={(e) => this.state.allowEdits ? this.setState({editAddress: true, editedAddress: this.state.editedAddress || this.props.shop.shopInfo.address1, editedCity: this.state.editedCity || this.props.shop.shopInfo.city, editedOffice: this.state.editedOffice || this.props.shop.shopInfo.address2, editedState: this.state.editedState || this.props.shop.shopInfo.state, editedPhone: this.state.editedPhone || this.props.shop.shopInfo.phone}) : null}>
            {!this.state.editAddress ?
            <ShopInfo address1={this.renderShopInfo('address1')} address2={this.renderShopInfo('address2')} city={this.renderShopInfo('city')} state={this.renderShopInfo('state')} phone={this.renderShopInfo('phone')} rating={this.renderShopInfo('rating')}/>
            : null
            }
            </div>
            {this.state.editAddress ?
            (<div>
                <div>Address: 
                  <input type="text" value={this.state.editedAddress} onChange={(e)=> this.setState({editedAddress: e.target.value})}/>
                </div>
                <div>Office#: 
                  <input type="text" value={this.state.editedOffice} onChange={(e)=> this.setState({editedOffice: e.target.value})}/>
                </div>
                <div>
                  City: 
                  <input type="text" value={this.state.editedCity} onChange={(e)=> this.setState({editedCity: e.target.value})}/>
                </div>
                <div>
                  State: 
                  <input type="text" value={this.state.editedState} onChange={(e)=> this.setState({editedState: e.target.value})}/>
                </div>
                <div>
                  Phone Number: 
                  <input type="text" value={this.state.editedPhone} onChange={(e)=> this.setState({editedPhone: e.target.value})}/>
                </div>
                <div>
                  <a href="#" onClick={(e) => this.setState({editAddress: false})}>Cancel</a>
                </div>
                <div>
                  <a href="#" onClick={(e) => this.saveEdits(this.props.shop.shopInfo.name, this.state.editedAddress, this.state.editedOffice, this.state.editedCity, this.state.editedState, this.state.editedPhone)}>Save changes</a>
                </div>
              </div>) 
              : null
            }
            <MapView 
              lat={this.renderShopInfo('lat') || .34} 
              lon={this.renderShopInfo('lon') || 32.5}
              height='50vh'
              width='50vh'
              />
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
  console.log(state);
  return {
    shop: state.shop
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchShopInfo: (url) => dispatch(fetchShopInfo(url)),
    updateShopData: (url, name, address1, address2, city, state, phone, cb) => dispatch(updateShopData(url, name, address1, address2, city, state, phone, cb))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Shop);


