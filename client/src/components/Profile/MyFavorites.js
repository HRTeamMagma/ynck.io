import React from 'react';
import Carousel from 'nuka-carousel';

class MyFavorites extends React.Component {

  render() {
    return (
      <div>  
        <h2>Favorites</h2>
          <div className="image_grid">  
            <Carousel slidesToShow={3} decorators={Carousel.getDefaultProps().decorators.slice(0, 2)}>
              {this.props.myFavorites.map ((images, i) => <img key={i} src ={images.url}/>)}
            </Carousel>
          </div>
      </div>
    );
  }
}

export default MyFavorites;