import React from 'react';
import MapView from './MapView';

class AllShops extends React.Component {
  constructor (props) {
    super (props);
  
  }
  


  render () {
    return (
      <div className="claim-shop-form">
        <h1 className="form_title">Browse Our Registered Shops</h1>
          <div className="shop-wrapper"> 
            {this.props.allShops ? 
              this.props.allShops.map((shop, i) => {
                return ( 
                  <div className="outer-card">
                    <div key={i} className="shop-card">
                      <div className="card-shop-info">
                        <h3><a href={`/shop/${shop.id}`}>{shop.name}</a></h3>
                        <p>{shop.address1}</p>
                        <p>{shop.address2}</p>
                        <p>{shop.city}, {shop.state}</p>
                        <p>{shop.phone}</p>
                      </div>
                      <div className="map">
                        <MapView lat={shop.latitude || shop.lat || .34 } lon={shop.longitude || shop.lon || 32} height="30vh" zoom={13}/>
                      </div>
                    </div>
                  </div>
                );
              })
            :
            null
            }
          </div>
        <h4>Don't see your shop? Click <a href="/claimshop">here</a> to claim a shop!</h4>
      </div>
    );
  }

}

export default AllShops;