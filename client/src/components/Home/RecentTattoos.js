import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class RecentTattoos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: []
    };
    this.getLatestImages = this.getLatestImages.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  componentDidMount() {
    this.getLatestImages();
  }

  getLatestImages() {
    axios.get('/api/latest-images')
    .then((res) => {
      this.setState({
        images: res.data
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleFavoriteClick() {
    console.log('favorite clicked');
    axios.post('/api/favorite')
    .then((res) => {
      // this.setState({
      //   images: res.data
      // });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="feed_container">
        <div className="recent_tattoos">
          <h2>Recent tattoos</h2>
          <div className="image_grid">
              { this.state.images.map((image, i) => {
                return (
                  <div key={i} className="solo_image">
                    <div className="overlay_container">
                      <img src="./assets/icons/heart.png" className="favorite" onClick={this.handleFavoriteClick}/>
                    </div>
                    <img src={image.url} className="base_pic" />
                  </div>
                ); 
              })}
          </div>
        </div>
      </div>
    );
  }
}


export default RecentTattoos;

