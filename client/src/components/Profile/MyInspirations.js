import React from 'react';
import Carousel from 'nuka-carousel';

const MyInspirations = React.createClass({

  mixins: [Carousel.ControllerMixin],
  render() {
    return (
      <div>  
        <h2>Inspiration</h2>
          <div className="image_grid">  
            <Carousel slidesToShow={3} decorators={Carousel.getDefaultProps().decorators.slice(0, 2)}>
              {this.props.myInspirations.map ((images, i) => <img key={i} src ={images.url}/>)}
            </Carousel>
          </div>
      </div>
    );
  }
});

export default MyInspirations;