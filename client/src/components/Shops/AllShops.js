import React from 'react';

class AllShops extends React.Component {
  constructor (props) {
    super (props);
  
  }

  componentDidMount() {
    this.props.fetchAllShops('/api/allShops');
  }


  render () {
    return (
      <div> 
        <h1>HELLO</h1>
        {this.props.allShops.data ? 
          this.props.allShops.data.map((shop) => {
            return <h1>shop.name</h1>;
          })
        :
        null
        }
      </div>
    );
  }

}

export default AllShops;