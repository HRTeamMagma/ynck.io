import React from 'react';
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
      currentTag: ''
    };

    this.onDrop = this.onDrop.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleTagInput = this.handleTagInput.bind(this);
    this.handleTagSubmit = this.handleTagSubmit.bind(this);
    this.handleTagDeleteClick = this.handleTagDeleteClick.bind(this);
  }

  onDrop(files) {
    upload.post('/api/upload-image')
    // .field('image_type', this.props.image_type)
    .field('image_type', 'tattoo')
    .attach('imageUpload', files[0])
    .end((err, res) => {
      if (err) {
        console.log(err);
      }
      console.log('stuff from Amazon:', JSON.parse(res.text));
      let imgURL = JSON.parse(res.text);
      imgURL = imgURL.location;
      this.setState({uploadedImg: imgURL});
    });
  }  

  handleSubmitForm(e) {
    e.preventDefault();
    console.log(this.state);
    axios.post('/api/images', this.state);
  }

  handleTagInput(event) {
    this.setState({
      currentTag: event.target.value
    });
  }

  handleTagDeleteClick(name) {
    let tagsCopy = Object.assign({}, this.state.tags);
    delete tagsCopy[name];
    this.setState({tags: tagsCopy});
  }

  handleTagSubmit(event) {
    event.preventDefault();
    if (this.state.currentTag) {
      let tagCopy = Object.assign({}, this.state.tags );
      tagCopy[this.state.currentTag] = true;
      this.setState({tags: tagCopy, currentTag: ''});
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
        <img src={this.state.uploadedImg} height="300px"/>
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
          {Object.keys(this.state.tags).map(tag => {
            return <Tag key={tag} tagName={tag} deleteClick={this.handleTagDeleteClick}/>;
          })}
          <input type="submit" value="Save" />
        </form>
      </div>;
    }
    return (
      <div>
        <Dropzone onDrop={this.onDrop} multiple={false}>
          <div>Try dropping a file here, or click to select a file to upload.</div>
        </Dropzone>
        {theForm}
      </div>
    );
  }
}

module.exports = UploadForm;