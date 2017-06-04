import React from 'react';

class MyInspirations extends React.Component {
  constructor(props) {
    super(props);

  }
  
  render() {
    return (
      <div>
        <h2>My Inspirations Feed</h2>
        <div className="image_grid">  
            {this.props.myInspirations.map ((images, i) => <img src = {images.url}/>)}
          </div>
      </div>
    );
  }
}

export default MyInspirations;