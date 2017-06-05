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
        <p className="info_element">{this.props.address1}</p>    
        <p className="info_element">{this.props.city}, {this.props.state}</p> 
        <p className="info_element">{this.props.phone}</p> 
      </div>
    );
  }
}

export default ShopInfo;