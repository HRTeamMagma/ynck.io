import React from 'react';

class MyDesigns extends React.Component {
  constructor(props) {
    super(props);

  }
  
  render() {
    return (
      <div>
        MyDesigns Feed
        {this.props.myDesigns.map ((images, i) => {
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

export default MyDesigns;