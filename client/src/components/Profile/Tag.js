import React from 'react';

class Tag extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className="tag">{this.props.tagName}<a href="" onClick={(e) => {
      e.preventDefault();
      this.props.deleteClick(this.props.tagName);
    }} >x</a></div>;
  }

}

export default Tag;