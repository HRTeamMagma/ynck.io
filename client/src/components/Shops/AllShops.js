import React from 'react';
import MapView from './MapView';

class AllShops extends React.Component {
  constructor (props) {
    super (props);
  
  }
  


  render () {
    return (
      <div className="feed-container"> 
        {this.props.allShops ? 
          this.props.allShops.map((shop, i) => {
            console.log(shop);
            return ( 
              <div key={i}>
                <h3><a href={`/shop/${shop.id}`}>{shop.name}</a></h3>
                <p>{shop.address1}</p>
                <p>{shop.address2}</p>
                <p>{shop.city}, {shop.state}</p>
                <p>{shop.phone}</p>
                <MapView lat={shop.latitude || shop.lat || .34 } lon={shop.longitude || shop.lon || 32} height='30vh' width='30vh' zoom={13}/>
              </div>
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