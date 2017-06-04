import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class RecentTattoos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: []
    };
  }

  componentDidMount() {
    console.log('get request called');
    axios.get('/api/latest-images')
    .then((res) => {
      this.setState({
        images: res.data
      })
      .catch((error) => {
        console.log(error);
      });
    });
  }

  render() {
    return (
      <div className="feed_container">
        <div className="recent_tattoos">
          <h2>Recent tattoos</h2>
          <div className="image_grid">
              { this.state.images.map((image, index) => {
                return (
                  <span>
                    <div className="overlay_container">
                      <img src="./assets/icons/heart.png" className="favorite"/>
                    </div>
                    <div className="grid_images">
                      <img src={image.url}/>
                    </div>
                  </span>
                ); })}
          </div>
        </div>
      </div>
    );
  }
}

export default RecentTattoos;