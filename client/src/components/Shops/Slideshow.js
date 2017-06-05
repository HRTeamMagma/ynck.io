'use strict';

var React = require('react');

var Carousel = require('nuka-carousel');

class Carry extends React.Component {
  render() {
    return (
      <Carousel slidesToShow={2}>
        {this.props.images.map(image => <img src={image}/>)}
      </Carousel>
    );
  }
}

module.exports = Carry;