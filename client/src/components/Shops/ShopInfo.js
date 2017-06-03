import React from 'react';

class ShopInfo extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      
    };
    
      
  }
  render () {
    return (
      <div className="shop_info">
        <div>
          {this.props.rating} / 5
        </div>
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

export default ShopInfo;