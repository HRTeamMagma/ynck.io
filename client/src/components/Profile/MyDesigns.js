import React from 'react';
import Carousel from 'nuka-carousel';

const MyDesigns = React.createClass({

  mixins: [Carousel.ControllerMixin],
  render() {
    return (
      <div>  
        <h2>My Designs Feed</h2>
          <div className="image_grid">  
            <Carousel slidesToShow={3}>
              {this.props.myDesigns.map ((images, i) => <img src = {images.url}/>)}
            </Carousel>
          </div>
      </div>
    );
  }
});

export default MyDesigns;