import React from 'react';

class ShopLocation extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      
    };
    
      
  }
  render () {
    return (
      <div className="shop_address">
       <div>
         {this.props.address1} {this.props.address2} 
       </div>    
       <div>
         {this.props.city}, {this.props.state}
       </div> 
       <div>
         {this.props.phone}
       </div> 
      </div>
    );
  }
}

export default ShopLocation;