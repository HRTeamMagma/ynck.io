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
        <img src={this.props.image} className="profile_image"/> 
      </div>
    );
  }
}

export default ShopLeader;