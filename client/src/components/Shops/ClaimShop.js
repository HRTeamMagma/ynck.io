import React from 'react';
import YelpSearchForm from './YelpSearchForm';
import axios from 'axios';
import MapView from './MapView';

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
    console.log(selectedShop);
    axios.post('/api/create/shop', {
      data: selectedShop
    })
    .then((success) => {
      console.log('YAY: ', success);
    })
    .catch(error => console.log(error));
  }

  render () {
    return ( 
      <div className="feed_container"> 
        <h1 className="profile_name">Claim Your Shop</h1>
        <YelpSearchForm onSubmit={this.submit}/>
        {this.state.tattooParlors.map((parlor, i) => {
          return (
            <div key={i} className="image_grid">
              <h3><a href={parlor.url} target="_blank" >{parlor.name}</a></h3>
              <div>
                <MapView lat={parlor.coordinates.latitude} lon={parlor.coordinates.longitude} height='60vh' width='60vh' zoom={13}/>
              </div>
              <button onClick={() => this.handleClick(parlor)}>Claim Shop</button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ClaimShop;