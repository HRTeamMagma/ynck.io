import React from 'react';

class GridImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hoverDisplay: false
    };
    this.toggleOverlayInfo = this.toggleOverlayInfo.bind(this);
  }

  toggleOverlayInfo() {
    console.log('inside toggle overlay');
    this.setState({
      hoverDisplay: !this.state.hoverDisplay
    });
  }

  render() {
    return (
      <div key={this.props.i} className="solo_image">
        { this.state.hoverDisplay ?
          <div className="hover-info">
            <div className="info">
              <h4>{this.props.image.title}</h4>
              <img src={this.props.image.profile.profile_image} className="mini-avatar" />
              <p className="overlay-name">{this.props.image.profile.display}</p>
            </div>
          </div> : null
        }
        { loggedInUser ? (
          <div className="overlay_container_front_page" onMouseEnter={()=> this.toggleOverlayInfo()} onMouseLeave ={() => this.toggleOverlayInfo()} >
            { this.props.image.isFavorited ?
              <img src="./assets/icons/favorited.png" className="heart" onClick={ () => { this.props.addAFavorite(this.props.image.id, this.props.i); } }/> 
            : <img src="./assets/icons/heart.png" className="heart" onClick={ () => { this.props.addAFavorite(this.props.image.id, this.props.i); } }/> 
            }
          </div>
          ) : null 
        }
        <img src={this.props.image.url} className="base_pic" />
      </div>
    );
  }
}

export default GridImage;
