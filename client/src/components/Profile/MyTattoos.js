import React from 'react';
import Carousel from 'nuka-carousel';
import Favorite from './../Favorite';
import UploadForm from '../UploadForm';


class MyTattoos extends React.Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
      <div>  
        <h2>My Tattoos</h2>
          <div className="image_grid">  
            <Carousel slidesToShow={3} decorators={Carousel.getDefaultProps().decorators.slice(0, 2)}>
              {this.props.myTattoos.map ((images, i) => <Favorite addToProfileFavorites={this.props.addToProfileFavorites} typeOfImage='tattoo' images={images} i={i}/> )}
            </Carousel>
            {loggedInUser.id === this.props.viewedUser ? (
              <UploadForm image_type="tattoo" />
            )
            :
            null}
          </div>
      </div>
    );
  }
}

export default MyTattoos;