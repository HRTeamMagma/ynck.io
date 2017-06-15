import React from 'react';
import ReactHighcharts from 'react-highcharts'; 
import axios from 'axios';


/*
Currently retrieves # of images for each tag in the db, calculates % based on
unique # of images in images_tags.

TODO: Change to only retrieve # for category tags:

blackwork
dotwork
geometric
japanese
neo-traditional
new school
realism
traditional
trash_polka
tribal
watercolor

Will have to change total # query in StatsController

*/

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPicsPerTag: {},
      percentagePerTag: {},
      totalTagged: 0
    };
    this.getCountPerTag = this.getCountPerTag.bind(this);
    this.getTotalTagged = this.getTotalTagged.bind(this);    
    this.calculatePercentage = this.calculatePercentage.bind(this);
  }

  componentDidMount() {
    this.getCountPerTag();
  }

  getCountPerTag() {
    axios.get('/api/stats/count-per-tag')
      .then(response => {
        let totalPicsPerTag = {};
        response.data.map(tag => {
          totalPicsPerTag[tag.tag_id] = tag.count;
        });
        this.setState({
          totalPicsPerTag
        });
        this.getTotalTagged();
      });
  }

  getTotalTagged() {
    axios.get('/api/stats/total-tagged')
      .then(response => {
        this.setState({
          totalTagged: response.data[0].count
        });
        this.calculatePercentage();
      });
  }

  calculatePercentage() {
    let percentagePerTag = {};

    for (let key in this.state.totalPicsPerTag) {
      let percentage = this.state.totalPicsPerTag[key] / this.state.totalTagged * 100;
      percentage.toFixed(2);
      percentagePerTag[key] = percentage;
      this.setState({
        percentagePerTag
      });
    }
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
          name: 'Dotwork',
          // y: 56.33
          y: this.state.percentagePerTag['1']
        }, {
          name: 'Trash Polka',
          // y: 24.03,
          y: this.state.percentagePerTag['2'],
          sliced: true,
          selected: true
        }, {
          name: 'Geometric',
          // y: 10.38
          y: this.state.percentagePerTag['3']
        }, {
          name: 'Watercolor',
          // y: 4.77
          y: this.state.percentagePerTag['4']
        }, {
          name: 'Neoclassical',
          // y: 0.91
          y: this.state.percentagePerTag['5']
        }, {
          name: 'Blackwork',
          // y: 0.2
          y: this.state.percentagePerTag['6']
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