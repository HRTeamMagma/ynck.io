import React from 'react';
import Carousel from 'nuka-carousel';
import Favorite from './../Favorite';

class MyTattoos extends React.Component {

  render() {
    return (
      <div>  
        <h2>My Tattoos</h2>
          <div className="image_grid">  
            <Carousel slidesToShow={3} decorators={Carousel.getDefaultProps().decorators.slice(0, 2)}>
              {this.props.myTattoos.map ((images, i) => <Favorite images={images} key={i}/> )}
            </Carousel>
          </div>
      </div>
    );
  }
}

export default MyTattoos;