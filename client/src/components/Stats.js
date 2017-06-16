import React from 'react';
import ReactHighcharts from 'react-highcharts'; 
import axios from 'axios';


class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagCount: {},
      percentagePerTag: {},
      totalTagged: 0      
    };
    this.getCountPerTag = this.getCountPerTag.bind(this);
    this.calculatePercentage = this.calculatePercentage.bind(this);
  }

  componentDidMount() {
    this.getCountPerTag();
  }

  getCountPerTag() {
    var categoryTags = ['blackwork', 'dotwork', 'geometric', 'japanese', 'neo-traditional', 'new school',
      'realism', 'traditional', 'trash polka', 'tribal', 'watercolor'];
    
    axios.get('/api/stats/tag-data')
      .then(response => {
        let [tagCount, countSum] = [{}, 0];
        response.data.map(tag => {
          if (categoryTags.includes(tag.name)) {
            tagCount[tag.name] = tag.image.length;
            countSum += tag.image.length;
          }
        });
        this.setState({
          tagCount,
          totalTagged: countSum
        });
        this.calculatePercentage();
      });
  }

  calculatePercentage() {
    let percentagePerTag = {};

    for (let key in this.state.tagCount) {
      let percentage = this.state.tagCount[key] / this.state.totalTagged * 100;
      percentagePerTag[key] = parseFloat(percentage.toFixed(2));
      this.setState({
        percentagePerTag
      });
    }
  }
  
  render() {

    // Highcharts config format
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
        name: 'Percentage of tattoos',
        colorByPoint: true,
        data: []
      }]
    };

    // Update Highcharts config with new name/percentage pairs
    if (this.state.percentagePerTag) {
      for (let tag in this.state.percentagePerTag) {
        let tagPair = {};
        tagPair['name'] = tag; // name is a Highcharts keyword
        tagPair['y'] = this.state.percentagePerTag[tag]; // y is a Highcharts keyword
        config.series[0].data.push(tagPair);
      }
    }

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