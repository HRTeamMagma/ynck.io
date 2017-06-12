import React from 'react';

import Header from './Header';
import Footer from './Footer';

class Template extends React.Component {
  render() {
    return (
			<div>  
				<Header loggedInUser={loggedInUser} submitSearch={this.props.submitSearch} />
				{this.props.children}
				<Footer/>
			</div>
    );
  }
}

export default Template;