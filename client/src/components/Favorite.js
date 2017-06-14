import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { addToFavorites } from '../../actions/actionRecentImages';



class Favorite extends React.Component {
  constructor(props) {
    super(props);

    this.addAFavorite = this.addAFavorite.bind(this);
  }

  addAFavorite(imageId, index) {
    
  }

  render() {
    return (
      <div key={this.props.i}>
        <div className="overlay_container">
          { this.props.images.isFavorited ?
            <img src="./../../assets/icons/favorited.png" className="heart" onClick={ () => { this.addAFavorite(this.props.images.id, this.props.i); } }/> 
          : <img src="./../../assets/icons/heart.png" className="heart" onClick={ () => { this.addAFavorite(this.props.images.id, this.props.i); } }/> 
            }
        </div>
        <img src={this.props.images.url} />
      </div>
    ); 
  }
}

const mapStateToProps = (state) => {
  return {
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);