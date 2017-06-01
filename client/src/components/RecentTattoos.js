import React from 'react';

const RecentTattoos = React.createClass ({
  render () {
    return (
      <div className="feed_container">
        <div className="recent_tattoos">
          <h2>Recent tattoos</h2>
          <div className="image_grid">
            <img src="assets/images/tattoo1.jpeg"/>
            <img src="assets/images/tattoo2.jpeg"/>
            <img src="assets/images/tattoo3.jpeg"/>
          </div>
        </div>
      </div>
    );
  }
});

export default RecentTattoos;