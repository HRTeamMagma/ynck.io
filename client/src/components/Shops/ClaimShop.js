import React from 'react';
import YelpSearchForm from './YelpSearchForm';
import axios from 'axios';

class ClaimShop extends React.Component {
  constructor (props) {
    super (props);

    this.state = {
      tattooParlors: [],
    };

    this.submit = this.submit.bind(this);
    this.findParlor = this.findParlor.bind(this);

  }
  submit (values) {
    this.findParlor(values);
  }

  findParlor (values) {
    axios.get('/api/yelp', {
      params: {
        term: values.term,
        location: values.city + ', ' + values.state,
      }
    })
    .then (response => {
      // let tattooParlors = [];
      // response.data.filter((results) => {
      //   if (results.categories[0].alias === 'tattoo' || results.categories[1].alias === 'tattoo') {
      //     tattooParlors.push(results);
      //     console.log(this.state.tattooParlors);
      //   } 
      // });
      this.setState({
        tattooParlors: response.data,
      });
    })
    .catch(error => console.log(error));
  }

  render () {
    console.log('state: ', this.state.tattooParlors);
    return ( 
      <div> 
        <h1>Claim Your Shop</h1>
        <YelpSearchForm onSubmit={this.submit}/>
        {this.state.tattooParlors.map((parlor, i) => {
          return <div key={i}>{parlor.name}</div>;
        })}
      </div>
    );
  }
}

export default ClaimShop;