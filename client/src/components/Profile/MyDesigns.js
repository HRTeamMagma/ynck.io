import React from 'react';
import Carousel from 'nuka-carousel';
import Favorite from './../Favorite';

class MyDesigns extends React.Component {

  render() {
    return (
      <div>  
        <h2>My Designs</h2>
          <div className="image_grid">  
            <Carousel slidesToShow={3} decorators={Carousel.getDefaultProps().decorators.slice(0, 2)}>
            {this.props.myDesigns.map ((images, i) => <Favorite images={images} i={i}/> )}

            </Carousel>
          </div>
      </div>
    );
  }
}

export default MyDesigns;