import React from 'react';
import MyTattoos from './MyTattoos';
import Following from './Following';

class Feed extends React.Component {
  render() {
    return (
      <div>
        <MyTattoos />
        <Following />
      </div>
    );
  }
}

export default Feed;