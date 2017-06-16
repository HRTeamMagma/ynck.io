import React from 'react';
import Rating from 'react-rating';

class ShopInfo extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {   
    };
  }

  render () {
    return (
      <div className="shop_info">
        <Rating 
        start={0} 
        stop={5} 
        initialRate={parseFloat(this.props.rating)} 
        empty={<img src="https://s3-us-west-1.amazonaws.com/media.ynck.com/empty_star.png" className="icon" />}
        full={<img src="https://s3-us-west-1.amazonaws.com/media.ynck.com/filled_star.png" className="icon" />}
        fractions={2}/>
        
        
        <p className="info_element"><strong>Rating</strong>: {this.props.rating}</p>    
        <p className="info_element">{this.props.address1}</p>    
        <p className="info_element">{this.props.city}, {this.props.state}</p> 
        <p className="info_element">{this.props.phone}</p> 
      </div>
    );
  }
}

export default ShopInfo;