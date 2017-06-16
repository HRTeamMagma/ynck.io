import React from 'react';
import ReactHighcharts from 'react-highcharts'; 
import axios from 'axios';


class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagCount: {},
      totalTagged: 0,
      percentagePerTag: {},
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
        // console.log('tagCount', this.state.tagCount);
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
    console.log('percentagePerTag', percentagePerTag);
  }
  
  render() {

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
          name: 'Blackwork',
          y: this.state.percentagePerTag['blackwork']
        }, {
          name: 'Dotwork',
          y: this.state.percentagePerTag['dotwork'],
          sliced: true,
          selected: true
        }, {
          name: 'Geometric',
          y: this.state.percentagePerTag['geometric']
        }, {
          name: 'Japanese',
          y: this.state.percentagePerTag['japanese']
        }, {
          name: 'Neo-traditional',
          y: this.state.percentagePerTag['neo-traditional']
        }, {
          name: 'New school',
          y: this.state.percentagePerTag['new school']
        }, {
          name: 'Realism',
          y: this.state.percentagePerTag['realism']
        }, {
          name: 'Traditional',
          y: this.state.percentagePerTag['traditional']
        }, {
          name: 'Trash Polka',
          y: this.state.percentagePerTag['trash polka']
        }, {
          name: 'Tribal',
          y: this.state.percentagePerTag['trash polka']
        }, {
          name: 'Watercolor',
          y: this.state.percentagePerTag['watercolor']        
        }]
      }]
    };

    // if (this.state.percentagePerTag) {
    //   console.log('state percentagePerTag', this.state.percentagePerTag);
    //   config.series[0].data.map(category => {
    //     console.log(category.y);
    //   })
    // }

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