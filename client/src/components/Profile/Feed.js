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
      <div className="user_stream">
        { this.props.myTattoos ?
          <MyTattoos myTattoos = {this.props.myTattoos}/>
          : null 
        }
        { this.props.myDesigns ?
          <MyDesigns myDesigns = {this.props.myDesigns}/>
          : null
        }
        { this.props.myInspirations ?
          <MyInspirations myInspirations = {this.props.myInspirations}/>
          : null
        }
        <Following />
      </div>
    );
  }
}

export default Feed;