import React from 'react';
import Carousel from 'nuka-carousel';
import Favorite from './../Favorite';
import UploadForm from '../UploadForm';


class MyDesigns extends React.Component {
  constructor (props) {
    super (props);
  }
  
  render() {
    return (
      <div>  
        <h2>My Designs</h2>
          <UploadForm image_type="designs" />
        
          <div className="image_grid">  
            <Carousel slidesToShow={3} decorators={Carousel.getDefaultProps().decorators.slice(0, 2)}>
            {this.props.myDesigns.map ((images, i) => <Favorite addToProfileFavorites={this.props.addToProfileFavorites} typeOfImage='design' i={i} images={images}/> )}

            </Carousel>
          </div>
      </div>
    );
  }
}

export default MyDesigns;