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
        <div className="feed_container"> 
          <h1 className="profile_name">Claim Your Shop</h1>
          <YelpSearchForm onSubmit={this.submit}/>
          {this.state.tattooParlors.map((parlor, i) => {
            return (
              <div key={i} className="shop-card">
                <h3><a href={parlor.url} target="_blank" >{parlor.name}</a></h3>
                <div>
                  <MapView lat={parlor.coordinates.latitude} lon={parlor.coordinates.longitude} zoom={13}/>
                </div>
                <button onClick={() => this.handleClick(parlor)}>Claim Shop</button>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="feed_container">
          <h2>You have already claimed a shop! </h2>
          <h3>Click <a className="secondary_link" href={`/shop/${loggedInUser.shop_id}`}>here</a> to see your claimed shop.</h3>
        </div>
      );
    }
  }
}

export default ClaimShop;