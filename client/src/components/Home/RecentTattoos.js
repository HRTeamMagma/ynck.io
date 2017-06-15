import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { recentImagesFetchData, addToFavorites } from '../../../actions/actionRecentImages';
import { getUserFavorites } from '../../../actions/actionFavorites';
import { CometSpinLoader } from 'react-css-loaders';
import InfiniteScroll from 'react-infinite-scroller';

class RecentTattoos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMoreItems: true,
      isLoading: false,
      pageNum: 1,
      pageSize: 1,
      hoverDisplay: false
    };
    this.getLatestImages = this.getLatestImages.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.addAFavorite = this.addAFavorite.bind(this);
    this.getTotalTattooPageSize = this.getTotalTattooPageSize.bind(this);
    this.toggleOverlayInfo = this.toggleOverlayInfo.bind(this);
  }

  componentDidMount() {
    this.getTotalTattooPageSize();
    this.getLatestImages();
    this.getFavorites();
  }

  getLatestImages() {
    // console.log(page)
    if (this.state.isLoading === false && this.state.pageNum <= this.state.pageSize) {
      this.setState({isLoading: true}, ()=> {
        this.props.recentImagesFetchData('/api/latest-images', this.state.pageNum, ()=> {
          this.setState({isLoading: false, pageNum: this.state.pageNum + 1});
        });
      });
    }
    // let nextPage = this.state.nextPage + 1
    // this.setState({nextPage})
  }

  getTotalTattooPageSize() {
    axios.get('/api/get-page-size')
    .then(results => {
      this.setState({pageSize: results.data.pageSize});
    });
  }

  getFavorites() {
    if (this.props.loggedInUser) {
      this.props.getUserFavorites('/api/user/favorites', this.props.loggedInUser.id );
    }
  }

  addAFavorite(imageId, index) {
    this.props.addToFavorites('/api/user/favorites', this.props.loggedInUser, imageId, this.props.recentImages, index);
  }

  toggleOverlayInfo() {
    this.setState({
      hoverDisplay: !this.state.hoverDisplay
    });
  }

  render() {
    let loader;
    if (this.state.pageNum > this.state.pageSize) {
      loader = null;
    } else {
      loader = <CometSpinLoader size={50} color={'#8f4b5a'}/>;
    }
    var items = [];
    if (items.length > 60) {
      this.setState({hasMoreItems: false});
    }
    
    loggedInUser ? (
      this.props.recentImages.forEach((image, i) => {
        items.push(
          <div key={i} className="solo_image">
            { this.state.hoverDisplay ?
              <div className="hover-info">
                <h4>{image.display}</h4>
                <h4>{image.title}</h4>
                <h4>{image.favoriteCount}</h4>
              </div> : null
            }
            <div className="overlay_container_front_page" onMouseEnter={this.toggleOverlayInfo} >
              { image.isFavorited ?
                <img src="./assets/icons/favorited.png" className="heart" onClick={ () => { this.addAFavorite(image.id, i); } }/> 
              : <img src="./assets/icons/heart.png" className="heart" onClick={ () => { this.addAFavorite(image.id, i); } }/> 
                }
            </div>
            <img src={image.url} className="base_pic" />
          </div>
        );
      }) 
    )
    :
    (
      this.props.recentImages.forEach((image, i) => {
        items.push(
          <div key={i} className="solo_image">
            <img src={image.url} className="base_pic" />
          </div>
        );
      }) 
    );
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.getLatestImages}
        hasMore={this.state.hasMoreItems}
        loader={loader}
        threshold={20}
        initialLoad={false}>

        <div className="feed_container">
          { this.props.recentImagesHasErrored ? <p>Sorry! There was an error loading the items</p> : null }
          { this.props.recentImagesIsLoading ? <CometSpinLoader size={50} color={'#8f4b5a'}/> : null }

          <div className="recent_tattoos">
            <h2>Recent tattoos</h2>
            <div className="image_grid">
              {items}
            </div>
          </div>
        </div>
      </InfiniteScroll>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    recentImages: state.recentImages,
    recentImagesHasErrored: state.recentImagesHasErrored,
    recentImagesIsLoading: state.recentImagesIsLoading,
    getFavoritesHasErrored: state.getFavoritesHasErrored,
    getFavoritesIsLoading: state.getFavoritesIsLoading,
    userFavorites: state.userFavorites
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    recentImagesFetchData: (url, pageNum, cb) => dispatch(recentImagesFetchData(url, pageNum, cb)),
    getUserFavorites: (url, id) => dispatch(getUserFavorites(url, id)),
    addToFavorites: (url, loggedInUser, imageId, imageArray, index) => dispatch(addToFavorites(url, loggedInUser, imageId, imageArray, index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecentTattoos);