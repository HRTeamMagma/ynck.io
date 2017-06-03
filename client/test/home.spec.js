import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import Home from '../src/components/Home/Home';


describe('<Home/>', function () {
  it('should have a logo', function () {
    const wrapper = shallow(<Home/>);
    expect(wrapper.find('.homeContainer')).to.have.length(1);
  });
});
