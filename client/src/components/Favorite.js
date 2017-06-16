import React from 'react';

class Favorite extends React.Component {
  constructor(props) {
    super(props);
  }


  toggleOverlayInfo() {
    this.setState({
      hoverDisplay: !this.state.hoverDisplay
    });
  }

  render() {
    let i = this.props.i;
    return (
      loggedInUser && JSON.stringify(loggedInUser.id) !== this.props.viewedUser ? (
        <div key={this.props.i}>
          <div className="overlay_container">
            { this.props.images.isFavorited ?
              <img src="./../../assets/icons/favorited.png" className="heart" onClick={ () => { this.props.addToProfileFavorites(this.props.images.id, this.props.typeOfImage, this.props.i); } }/> 
            : 
              <img src="./../../assets/icons/heart.png" className="heart" onClick={ () => { this.props.addToProfileFavorites(this.props.images.id, this.props.typeOfImage, this.props.i); } }/> 
              }
          </div>
          <img src={this.props.images.url} />
        </div>
      )
      :
      (
        <div key={this.props.i}>
          <img src={this.props.images.url} />
        </div>
      )
    ); 
  }
}

export default Favorite;