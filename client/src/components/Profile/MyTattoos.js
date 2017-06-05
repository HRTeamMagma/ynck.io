import React from 'react';
import Carousel from 'nuka-carousel';

const MyTattoos = React.createClass({

  mixins: [Carousel.ControllerMixin],
  render() {
    return (
      <div>  
        <h2>My Tattoos Feed</h2>
          <div className="image_grid">  
            <Carousel slidesToShow={3}>
              {this.props.myTattoos.map ((images, i) => <img src = {images.url}/>)}
            </Carousel>
          </div>
      </div>
    );
  }
});

export default MyTattoos;