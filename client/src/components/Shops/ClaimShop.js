import React from 'react';
import YelpSearchForm from './YelpSearchForm';
import axios from 'axios';

class ClaimShop extends React.Component {
  constructor (props) {
    super (props);

    this.submit = this.submit.bind(this);
    this.findParlor = this.findParlor.bind(this);

  }
  submit (values) {
    console.log(values);
    this.findParlor(values);
  }

  findParlor (values) {
    axios.get('/api/yelp', {
      params: {
        term: values.term,
        location: values.location,
      }
    })
    .then (response => {
      console.log(response);
    })
    .catch(error => console.log(error));
  }

  render () {
    return ( 
      <div> 
        <h1>Claim Your Shop</h1>
        <YelpSearchForm onSubmit={this.submit}/>
      </div>
    );
  }
}

export default ClaimShop;