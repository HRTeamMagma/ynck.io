import React from 'react';

class MyInspirations extends React.Component {
  constructor(props) {
    super(props);

  }
  
  render() {
    return (
      <div>
        MyInspirations Feed
        {this.props.myInspirations.map ((images, i) => {
          return (
            <div key={i}> 
              <img src = {images.url}></img>
            </div>
          );
        })}
        
      </div>
    );
  }
}

export default MyInspirations;