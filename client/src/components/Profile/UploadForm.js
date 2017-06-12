import React from 'react';
import { connect } from 'react-redux';
import { updateUserPhotosSuccess } from '../../../actions/actionUserInfo';
const Dropzone = require('react-dropzone');
const upload = require('superagent');
const axios = require('axios');
import Tag from './Tag';

class UploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedImg: null,
      tags: {},
      title: '',
      currentTag: '',
      imageId: null,
      spinner: false
    };

    this.onDrop = this.onDrop.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleTagInput = this.handleTagInput.bind(this);
    this.handleTagSubmit = this.handleTagSubmit.bind(this);
    this.handleTagDeleteClick = this.handleTagDeleteClick.bind(this);
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
      console.log('stuff from Amazon:', JSON.parse(res.text));
      let data = JSON.parse(res.text);
      let imgURL = data.location;
      let imageId = data.imageId;
      this.setState({uploadedImg: imgURL, imageId });
    });
  }

  handleSubmitForm(e) {
    this.setState({spinner: true});
    e.preventDefault();
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
      this.setState({spinner: false, uploadedImg: null});
    })
    .catch(err => {
      console.log(err);
      this.setState({spinner: false, uploadedImg: null});
    });
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
    let theForm;
    if (this.state.uploadedImg) {
      // present a form
      theForm = 
      <div>
        <img className="uploaded-image" src={this.state.uploadedImg} height="300px"/>
        <form onSubmit={this.handleSubmitForm}>
          <label>
            Title
            <input
              name="title"
              type="text"
              value={this.state.title}
              onChange={this.handleInputChange} />
          </label>
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
          <p><input type="submit" value="Save" /></p>
        </form>
      </div>;
    } else {
      let spinning;
      if (this.state.spinner) {
        spinning = <div><img src="http://psdwizard.com/wp-content/uploads/2016/07/rubiks-loader.gif" width="200px" /></div>;
      } else {
        spinning = <div>Try dropping a file here, or click to select a file to upload.</div>;
      }
      theForm = 
      <div>
        <Dropzone onDrop={this.onDrop} multiple={false}>
          {spinning}
        </Dropzone>
      </div>;
    }
    return (
      <div>{theForm}</div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    userData: state.userData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserPhotosSuccess: (photoData) => dispatch(updateUserPhotosSuccess(photoData))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadForm);
