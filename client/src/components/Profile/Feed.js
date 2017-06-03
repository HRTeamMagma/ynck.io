import React from 'react';
import MyTattoos from './MyTattoos';
import MyDesigns from './MyDesigns';
import MyInspirations from './MyInspirations';
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
        <MyDesigns myDesigns = {this.props.myDesigns}/>
        <MyInspirations myInspirations = {this.props.myInspirations}/>
        <Following />
      </div>
    );
  }
}

export default Feed;