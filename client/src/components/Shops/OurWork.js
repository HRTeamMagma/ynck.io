import React from 'react';

class OurWork extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      
    };
    
      
  }
  render () {
    return (
      <div>
        <img src={this.props.image} className="example-work-photo" />
      </div>
    );
  }
}

export default OurWork;