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
        <h2>Tattoos</h2>
        <div className="image_grid">  
          {this.props.myTattoos !== undefined ? 
            (
              <Carousel slidesToShow={3} decorators={Carousel.getDefaultProps().decorators.slice(0, 2)}>
                {this.props.myTattoos.map ((image, i) => <Favorite addToProfileFavorites={this.props.addToProfileFavorites} typeOfImage='tattoo' viewedUser={this.props.viewedUser} image={image} i={i}/> )}
              </Carousel>  
            ) : null
          }
          {JSON.stringify(loggedInUser.id) === this.props.viewedUser ? 
            (
              <UploadForm image_type="tattoo" />
            ) : null
          }
        </div>
      </div>
    );
  }
}

export default MyTattoos;