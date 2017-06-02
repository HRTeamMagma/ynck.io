import React from 'react';

class ShopLeader extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      
    };
    
      
  }
  render () {
    return (
      <div>
        <img src={this.props.image} className="shop_profile_image"/> 
        <div>
        {this.props.name}
        </div>
        <div>
        {this.props.rating} / 5
        </div>


      </div>
    );
  }
}

export default ShopLeader;