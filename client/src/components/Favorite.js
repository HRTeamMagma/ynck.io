import React from 'react';

class Favorite extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let favoriteStatus;
    this.props.image.isFavorited ? favoriteStatus = 'favorited' : favoriteStatus = 'heart';
 
    return (
      <div key={this.props.i}>
        { loggedInUser && JSON.stringify(loggedInUser.id) !== this.props.viewedUser ? 
          <div className="overlay_container">
            <img src={`../assets/icons/${favoriteStatus}.png`} className="heart" onClick={ () => { this.props.addToProfileFavorites(this.props.image.id, this.props.typeOfImage, this.props.i); } }/>  
          </div> : null
        } 
        <img src={this.props.image.url} />
      </div>
    );
  }
}

export default Favorite;