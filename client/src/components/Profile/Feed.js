import React from 'react';
import MyTattoos from './MyTattoos';
import Following from './Following';

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }
  render() {
    return (
      <div>
        <MyTattoos myTattoos = {this.props.myTattoos}/>
        <Following />
      </div>
    );
  }
}

export default Feed;