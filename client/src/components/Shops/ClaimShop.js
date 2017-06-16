import React from 'react';
import YelpSearchForm from './YelpSearchForm';
import axios from 'axios';
import MapView from './MapView';

import { BrowserRouter } from 'react-router-dom';

class ClaimShop extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      tattooParlors: [],
    };

    this.submit = this.submit.bind(this);
    this.findParlor = this.findParlor.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }
  submit (values) {
    this.findParlor(values);
  }

  findParlor (values) {
    axios.get('/api/yelp', {
      params: {
        term: values.term,
        location: values.city + ', ' + values.state,
      }
    })
    .then (response => {
      this.setState({
        tattooParlors: response.data,
      });
    })
    .catch(error => console.log(error));
  }

  handleClick (selectedShop) {
    axios.post('/api/create/shop', {
      data: selectedShop
    })
    .then((success) => {
      axios.get('/api/shop', {
        id: loggedInUser.id
      })
      .then((success) => {
        this.props.history.push(`/shop/${success.data.shopInfo.id}`);
      });
    })
    .catch(error => console.log(error));
  }

  render () {
    if (loggedInUser.shop_id === null) {
      return ( 
        <div className="claim-shop-form">
          <h1 className="form_title">Claim Your Shop</h1>
          <YelpSearchForm onSubmit={this.submit}/>
          <div className="shop-wrapper">
          {this.state.tattooParlors.map((parlor, i) => {
            return (
              <div className="outer-card">
                <a href={parlor.url} target="_blank" >
                  <div key={i} className="shop-card">
                    <div className="card-shop-info">
                      <h3>{parlor.name}</h3>
                      <p>{parlor.location.address1}</p>
                      <p>{parlor.location.city}, {parlor.location.state} {parlor.location.zip_code}</p>
                    </div>
                    <div className="map">
                      <MapView lat={parlor.coordinates.latitude} lon={parlor.coordinates.longitude} height="30vh" zoom={13}/>
                    </div>
                    <button className="claim-shop-button"onClick={() => this.handleClick(parlor)}>Claim Shop</button>
                  </div>
                </a>
              </div>
            );
          })}
          </div>  
        </div>
      );
    } else {
      return (
        <div className="claim_shop_container">
          <h2>You have already claimed a shop! </h2>
          <h3>Click <a className="secondary_link" href={`/shop/${loggedInUser.shop_id}`}>here</a> to see your claimed shop.</h3>
        </div>
      );
    }
  }
}

export default ClaimShop;