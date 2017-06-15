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
          <div className="image_grid">  
            {this.props.myDesigns !== undefined ? (
              <Carousel slidesToShow={3} decorators={Carousel.getDefaultProps().decorators.slice(0, 2)}>
              {this.props.myDesigns.map ((images, i) => <Favorite addToProfileFavorites={this.props.addToProfileFavorites} typeOfImage='design' viewedUser={this.props.viewedUser} i={i} images={images}/> )}
              </Carousel>
              )
            : null
            }
            {JSON.stringify(loggedInUser.id) === this.props.viewedUser ? (
              <UploadForm image_type="design" />
            )
            :
            null}
          </div>
      </div>
    );
  }
}

export default MyDesigns;