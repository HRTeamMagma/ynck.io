// For some unexplained crazy reason...the tests blow up if these spec files don't start with 'home'.

import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import Header from '../src/components/Header';


describe('<Header/>', function () {
  it('should have a logo', function () {
    const wrapper = shallow(<Header/>);
    expect(wrapper.find('.logo')).to.have.length(1);
  });

  it('should have props for logged in user', function () {
    const wrapper = shallow(<Header/>);
    expect(wrapper.props().loggedInUser).to.be.defined;
  });
});
