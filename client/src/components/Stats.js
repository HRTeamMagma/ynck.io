import React from 'react';
import ReactHighcharts from 'react-highcharts'; 
 
const config = {
  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  series: [{
    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
  }]
};


class Stats extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div className="stats">
        <div className="feed_container">
          <h4>Stats about the site</h4>
          <ReactHighcharts config = {config} />
        </div>
      </div>
    );
  }
}

export default Stats;