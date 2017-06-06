import React from 'react';
const Dropzone = require('react-dropzone');
const upload = require('superagent');

class UploadForm extends React.Component {
  constructor(props) {
    super(props);
  }

  onDrop(files) {
    upload.post('/api/upload-image')
    .attach('imageUpload', files[0])
    .end((err, res) => {
      if (err) {
        console.log(err);
      }
      alert('File uploaded!');
    });
  }
  render() {
    return (
      <div>
        <Dropzone onDrop={this.onDrop} multiple={false}>
          <div>Try dropping a file here, or click to select a file to upload.</div>
        </Dropzone>
      </div>
    );
  }
}

module.exports = UploadForm;