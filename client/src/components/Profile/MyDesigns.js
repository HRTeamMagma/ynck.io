import React from 'react';

class MyDesigns extends React.Component {
  constructor(props) {
    super(props);

  }
  
  render() {
    return (
      <div>
        <h2>My Designs Feed</h2>
         <div className="image_grid">  
            {this.props.myDesigns.map ((images, i) => <img src = {images.url}/>)}
          </div>
      </div>
    );
  }
}

export default MyDesigns;