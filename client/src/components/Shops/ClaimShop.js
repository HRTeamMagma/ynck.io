import React from 'react';
import YelpSearchForm from './YelpSearchForm';

class ClaimShop extends React.Component {
  constructor (props) {
    super (props);
  }

  render () {
    return ( 
      <div> 
        <h1>Claim Your Shop </h1>
        <YelpSearchForm />
      </div>
    );
  }
}

export default ClaimShop;