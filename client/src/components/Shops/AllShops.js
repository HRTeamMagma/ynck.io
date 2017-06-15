import React from 'react';

class AllShops extends React.Component {
  constructor (props) {
    super (props);
  
  }
  


  render () {
    return (
      <div> 
        <h1>HELLO</h1>
        
        {this.props.allShops ? 
          this.props.allShops.map((shop) => {
            return (
              <h1>{shop.name}</h1>
            );
          })
        :
        null
        }
      </div>
    );
  }

}

export default AllShops;