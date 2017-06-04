import React from 'react';

class MyTattoos extends React.Component {
  constructor(props) {
    super(props);

  }
  
  render() {
    return (
      <div>  
        <h2>MyTattoos Feed</h2>
          <div className="image_grid">  
            {this.props.myTattoos.map ((images, i) => <img src = {images.url}/>)}
          </div>
      </div>
    );
  }
}

export default MyTattoos;