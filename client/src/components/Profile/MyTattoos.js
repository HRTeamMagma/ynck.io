import React from 'react';
import Carousel from 'nuka-carousel';
import Favorite from './../Favorite';

class MyTattoos extends React.Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
      <div>  
        <h2>My Tattoos</h2><button>Upload an image</button>
          <div className="image_grid">  
            <Carousel slidesToShow={3} decorators={Carousel.getDefaultProps().decorators.slice(0, 2)}>
              {this.props.myTattoos.map ((images, i) => <Favorite addToProfileFavorites={this.props.addToProfileFavorites} typeOfImage='tattoo' images={images} i={i}/> )}
            </Carousel>
          </div>
      </div>
    );
  }
}

export default MyTattoos;