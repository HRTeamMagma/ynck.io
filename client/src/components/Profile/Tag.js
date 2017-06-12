import React from 'react';

class Tag extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <span className="tag">{this.props.tagName}<a href="" className="tag-delete" onClick={(e) => {
      e.preventDefault();
      this.props.deleteClick(this.props.tagName);
    }} >✖</a></span>;
  }
}

export default Tag;