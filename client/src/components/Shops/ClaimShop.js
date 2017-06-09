import React from 'react';
import YelpSearchForm from './YelpSearchForm';

class ClaimShop extends React.Component {
  constructor (props) {
    super(props);
  }
  
  submit (values) {
    console.log(values);
  }
  render () {
    return ( 
      <div> 
        <h1>Claim Your Shop </h1>
        <YelpSearchForm onSubmit={this.submit}/>
      </div>
    );
  }
}

export default ClaimShop;