import React from 'react';
import Carousel from 'nuka-carousel';

const MyTattoos = React.createClass({

  mixins: [Carousel.ControllerMixin],
  render() {
    return (
      <div>  
        <h2>My Tattoos</h2>
          <div className="image_grid">  
            <Carousel slidesToShow={3} decorators={Carousel.getDefaultProps().decorators.slice(0, 2)}>
              {this.props.myTattoos.map ((images, i) => <img key={i} src={images.url}/>)}
            </Carousel>
          </div>
      </div>
    );
  }
});

export default MyTattoos;