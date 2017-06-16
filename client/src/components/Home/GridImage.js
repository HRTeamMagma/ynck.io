import React from 'react';

class GridImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hoverDisplay: false
    };
    this.toggleOverlayInfoEnter = this.toggleOverlayInfoEnter.bind(this);
    this.toggleOverlayInfoLeave = this.toggleOverlayInfoLeave.bind(this);
  }

  toggleOverlayInfoEnter() {
    this.setState({
      hoverDisplay: true
    });
  }

  toggleOverlayInfoLeave() {
    this.setState({
      hoverDisplay: false
    });
  }

  render() {
    return (
      <div key={this.props.i} className="solo_image">
        { this.state.hoverDisplay ?
          <div className="hover-info" onMouseLeave={ () => { this.toggleOverlayInfoLeave();} } onMouseEnter={ ()=> {this.toggleOverlayInfoEnter();} }>
            <div className="info">
              <img src={this.props.image.profile.profile_image} className="mini-avatar" />
              <p className="overlay-name"><a href={`/user/${this.props.image.profile.id}`}>{this.props.image.profile.display}</a></p>
            </div>
          </div> : null
        }
        { loggedInUser ? (
          <div className="overlay_container_front_page" onMouseEnter={()=> this.toggleOverlayInfoEnter()} onMouseLeave ={() => this.toggleOverlayInfoLeave()} >
            { this.props.image.isFavorited ?
              <img src="./assets/icons/favorited.png" className="heart" onClick={ () => { this.props.addAFavorite(this.props.image.id, this.props.i); } }/> 
            : <img src="./assets/icons/heart.png" className="heart" onClick={ () => { this.props.addAFavorite(this.props.image.id, this.props.i); } }/> 
            }
          </div>
          ) : (
             <div className="overlay_container_front_page" onMouseEnter={()=> this.toggleOverlayInfo()} onMouseLeave ={() => this.toggleOverlayInfo()} >
             </div>
          )
        }
        <img src={this.props.image.url} className="base_pic" />
      </div>
    );
  }
}

export default GridImage;
