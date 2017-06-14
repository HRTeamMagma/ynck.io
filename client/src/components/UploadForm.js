import React from 'react';
import { connect } from 'react-redux';
const axios = require('axios');
const Dropzone = require('react-dropzone');
const upload = require('superagent');

import Tag from './Profile/Tag';
import Modal from './Modal';
import { updateUserPhotosSuccess } from '../../actions/actionUserInfo';
import { updateShopPhotosSuccess } from '../../actions/actionShopInfo';

class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedImg: null,
      tags: {},
      title: '',
      currentTag: '',
      imageId: null,
      shopId: null,
      spinner: false,
      modalIsOpen: false 
    };

    this.onDrop = this.onDrop.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleTagInput = this.handleTagInput.bind(this);
    this.handleTagSubmit = this.handleTagSubmit.bind(this);
    this.handleTagDeleteClick = this.handleTagDeleteClick.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });
  }

  onDrop(files) {
    this.setState({spinner: true});
    upload.post('/api/upload-image')
    .field('image_type', this.props.image_type)
    .attach('imageUpload', files[0])
    .end((err, res) => {
      this.setState({spinner: false});
      if (err) {
        console.log(err);
      }
      let data = JSON.parse(res.text);
      let imgURL = data.location;
      let imageId = data.imageId;
      let shopId;
      if (data.shopId) {
        shopId = data.shopId;
        imageId = data.shopimageId;
      }
      this.setState({uploadedImg: imgURL, imageId, shopId });
    });
  }

  handleSubmitForm(e) {
    this.setState({spinner: true});
    e.preventDefault();
    if (this.props.image_type === 'shopimage') {
      let reqObj = {
        uploadedImg: this.state.uploadedImg,
        title: this.state.title,
        imageId: this.state.imageId,
        shopId: this.state.shopId
      };
      axios.post('/api/edit-image', reqObj)
      .then(result => {
        let photoData = {
          id: this.state.imageId,
          url: this.state.uploadedImg,
          title: this.state.title,
          shopId: this.state.shopId
        };
        this.props.updateShopPhotosSuccess(photoData);
        this.setState({spinner: false, uploadedImg: null, title: ''});
      })
      .catch(err => {
        console.log(err);
        this.setState({spinner: false, uploadedImg: null, title: ''});
      });
    } else {
      axios.post('/api/edit-image', this.state)
      .then(result => {
        let tagArray = Object.keys(this.state.tags);
        let photoData = {
          id: this.state.imageId,
          url: this.state.uploadedImg,
          profile_id: loggedInUser.id,
          favoriteCount: 0,
          image_type: this.props.image_type,
          title: this.state.title,
          tags: tagArray
        };
        this.props.updateUserPhotosSuccess(photoData);
        this.setState({spinner: false, uploadedImg: null, title: ''});
      })
      .catch(err => {
        console.log(err);
        this.setState({spinner: false, uploadedImg: null, title: ''});
      });
    }
  }

  handleTagInput(event) {
    this.setState({
      currentTag: event.target.value
    });
  }

  handleTagDeleteClick(name) {
    let tagsCopy = Object.assign({}, this.state.tags);

    axios.post('/api/delete-tag', {tagName: name, imageId: this.state.imageId} )
    .then(success => {
      delete tagsCopy[name];
      this.setState({tags: tagsCopy});
    })
    .catch(err => {
      console.log(err);
    });
  }

  handleTagSubmit(event) {
    event.preventDefault();
    if (this.state.currentTag) {
      let tagCopy = Object.assign({}, this.state.tags );
      if (tagCopy[this.state.currentTag]) {
        return;
      }
      tagCopy[this.state.currentTag] = true;
      axios.post('/api/add-tag', {tagName: this.state.currentTag, imageId: this.state.imageId})
      .then(success => {
        this.setState({tags: tagCopy, currentTag: ''});
      });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value
    });
  }

  render() {
    let theForm, showTags;

    // if this is a regular image, show the tag component
    if (this.props.image_type !== 'shopimage') {
      showTags = <div>
        <label>
          Add a tag:
          <input
            type="text"
            value={this.state.currentTag}
            onChange={this.handleTagInput} />
          <input type="submit" value="Add tag" onClick={this.handleTagSubmit}/>
        </label>
        <div>
          {Object.keys(this.state.tags).map(tag => {
            return <Tag key={tag} tagName={tag} deleteClick={this.handleTagDeleteClick}/>;
          })}
        </div>
       </div>;
    }
    if (this.state.uploadedImg) {
      // present a form
      theForm = 
      <div>
        <img className="uploadedImage" src={this.state.uploadedImg} height="300px"/>
        <form onSubmit={this.handleSubmitForm}>
          <div className="imageInfo">
            <input name="title" type="text" value={this.state.title} onChange={this.handleInputChange} placeholder="Add a title..."/>
            {showTags}
          </div>
          <div className="modalButtons">
            <button onClick={this.props.onClose}>Cancel</button>
            <button onClick={this.props.onClose}>Save</button>            
          </div>
        </form>
      </div>;
    } else {
      let spinning;
      if (this.state.spinner) {
        spinning = <div><img src="http://psdwizard.com/wp-content/uploads/2016/07/rubiks-loader.gif" width="200px" /></div>;
      } else {
        spinning = <div>Drop an image or click to upload</div>;
      }
      theForm = 
        <div>
          <Dropzone onDrop={this.onDrop} multiple={false}>
            {spinning}
          </Dropzone>
          <div className="modalButtons">
            <button onClick={this.toggleModal}>Cancel</button>
          </div>
        </div>
    }
    return (
      <div>
        <button onClick={this.toggleModal}>Upload work</button>
        <Modal showModal={this.state.modalIsOpen} onClose={this.toggleModal}>
          {theForm}
        </Modal>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    shop: state.shop
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserPhotosSuccess: (photoData) => dispatch(updateUserPhotosSuccess(photoData)),
    updateShopPhotosSuccess: (photoData) => dispatch(updateShopPhotosSuccess(photoData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadForm);
