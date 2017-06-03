import React from 'react';

class OurWork extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      
    };
    
      
  }
  render () {
    return (
      <div className="shop_work">
        <h2>Our Work</h2>
        <div className="image_grid">
        { this.props.images.map(image => <img src={image}/>) }

          
        </div>
      </div>
    );
  }
}

export default OurWork;