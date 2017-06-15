import React from 'react';
import ReactHighcharts from 'react-highcharts'; 
import axios from 'axios';


class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPicsPerTag: {}
    };
    this.getStats = this.getStats.bind(this);
  }

  componentDidMount() {
    this.getStats();
  }

  getStats() {
    axios.get('/api/stats')
      .then(response => {
        var totalPicsPerTag = {};
        response.data.map(tag => {
          totalPicsPerTag[tag.tag_id] = tag.count;
        });
        this.setState({
          totalPicsPerTag
        });
      });
  }

  render() {
    this.state.totalPicsPerTag ? 
      console.log('in render totalPicsPerTag', this.state.totalPicsPerTag)
      : null;
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
        '#8f4b5a', '#4b8f5e', '#4b7c8f', '#f7a35c', '#8085e9',
        '#2a2a2a', '#26f683'
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
    };
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