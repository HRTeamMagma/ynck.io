import React from 'react';

class MyTattoos extends React.Component {
  constructor(props) {
    super(props);

  }
  
  render() {
    return (
      <div>
        MyTattoos Feed
        {this.props.myTattoos.map ((images, i) => {
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

export default MyTattoos;