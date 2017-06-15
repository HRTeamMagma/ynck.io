import React from 'react';
import ReactHighcharts from 'react-highcharts'; 
 
const config = {
  chart: {
    style: {
      fontFamily: 'Arial'
    },
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie'
  },
  colors: [
    '#8f4b5a', '#4b8f5e', '#4b7c8f', '#f7a35c', '#8085e9'
  ],
  credits: {
    enabled: false
  },
  title: {
    text: 'Breakdown of tattoo styles'
  },
  tooltip: {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: false
      },
      showInLegend: true
    }
  },
  series: [{
    name: 'Tattoos',
    colorByPoint: true,
    data: [{
      name: 'Dotwork',
      y: 56.33
    }, {
      name: 'Trash Polka',
      y: 24.03,
      sliced: true,
      selected: true
    }, {
      name: 'Geometric',
      y: 10.38
    }, {
      name: 'Watercolor',
      y: 4.77
    }, {
      name: 'Neoclassical',
      y: 0.91
    }, {
      name: 'Blackwork',
      y: 0.2
    }]
  }]

  // Line graph
  // xAxis: {
  //   categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  // },
  // series: [{
  //   data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 295.6, 454.4]
  // }]
};


class Stats extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="stats">
        <div className="feed_container">
          <ReactHighcharts config = {config} />
        </div>
      </div>
    );
  }
}

export default Stats;